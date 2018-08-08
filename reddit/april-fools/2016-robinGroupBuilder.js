// ==UserScript==
// @name         Robin Group Builder
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Form groups based on size for Reddit's Robin experiment (April Fools 2016)
// @author       eisbaerBorealis
// @match        https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==

// helpful script I pulled some code from:
//   https://raw.githubusercontent.com/keythkatz/Robin-Autovoter/master/robinautovoter.user.js

// useful commands for Robin:
//    /count
//    /tally

(function()
{
    'use strict';

    // Change these values
    var USER_MIN_SIZE = 50;
    var USER_MAX_SIZE = 100000;

    if(USER_MAX_SIZE < USER_MIN_SIZE)
    {
        USER_MAX_SIZE = 100000;
    }

    // "Reload page on 503" - GuitarShirt and keythkatz
    if(document.querySelectorAll("img[src='//www.redditstatic.com/trouble-afoot.jpg']").length > 0) window.location.reload();

    // Check if you're in a chatroom or not. If not, join a new chatroom
    if(window.location.href === "https://www.reddit.com/robin/join")
    {
        console.log("DEBUG: On front page of Robin.");
        setTimeout(function(){window.location.reload();}, 30*60*1000);
        joinRobin();
    }
    else
    {
        console.log("DEBUG: You are in a chatroom");
        
        //  If your group hasn't STAYed, the robinQuitWidgets display will be "none"
        if(document.getElementById("robinQuitWidget").style.display === "block")
        {
            console.log("DEBUG: You made a subreddit, congrats!");
            document.getElementsByClassName("robin-chat--quit")[0].click();
        }
        
        var timeRemaining = Math.floor((r.config.robin_room_reap_time - Date.now())/*/1000*/);
        var totalUsers = r.config.robin_user_list.length;
        var growVotes = r.config.robin_user_list.filter(function(voter){return voter.vote === "INCREASE";}).length;
        var stayVotes = r.config.robin_user_list.filter(function(voter){return voter.vote === "CONTINUE";}).length;
        var abstainers = totalUsers - growVotes - stayVotes;

        var timeoutTime;
        if(timeRemaining > (25 * 60 * 1000))
        {
            console.log("DEBUG: timeRemaining (" + timeRemaining + ") is greater than 25 minutes (1500000 ms)");
            timeoutTime = 20 * 60 * 1000; // set timeout to 20 minutes
        }
        else if(timeRemaining > (15 * 60 * 1000))
        {
            console.log("DEBUG: timeRemaining (" + timeRemaining + ") is greater than 15 minutes (900000 ms)");
            timeoutTime = 10 * 60 * 1000; // set timeout to 10 minutes
        }
        else if(timeRemaining > (5 * 60 * 1000))
        {
            console.log("DEBUG: timeRemaining (" + timeRemaining + ") is greater than 5 minutes (300000 ms)");
            timeoutTime = 5 * 60 * 1000; // set timeout to 5 minutes
        }
        else if(timeRemaining > (2 * 60 * 1000))
        {
            console.log("DEBUG: timeRemaining (" + timeRemaining + ") is greater than 2 minutes (120000 ms)");
            timeoutTime = 2 * 60 * 1000; // set timeout to 2 minutes
        }
        else if(timeRemaining > (30 * 1000))
        {
            console.log("DEBUG: timeRemaining (" + timeRemaining + ") is greater than 30 seconds (30000 ms)");
            timeoutTime = 30 * 1000; // set timeout to 30 seconds
        }
        else if(timeRemaining > (-5 * 1000))
        {
            console.log("DEBUG: timeRemaining (" + timeRemaining + ") is under 30 seconds (30000 ms)");
            timeoutTime = 30 * 1000; // set timeout to 30 seconds
        }
        else // We're five minutes past reaping time
        {
            console.log("DEBUG: Changing timeout to 10 minutes because we may be here a while...");
            timeoutTime = 10 * 60 * 1000; // set timeout to 10 minutes
            
            if(timeRemaining < (-60 * 60 * 1000))
            {
                console.log("Voting ended an hour ago. Time to start over");
//                sendMessage("/leave_room");
            }
        }

        setTimeout(function(){window.location.reload();}, timeoutTime);

        if(totalUsers/2 > USER_MAX_SIZE || stayVotes > USER_MAX_SIZE)
        {
            console.log("DEBUG: Bigger than you wanted. Leaving room");
            sendMessage("/leave_room");
        }
        else if(timeRemaining < (60 * 1000))
        {
            console.log("DEBUG: Less than one minute to go!"); // unless you're stuck in that endless waiting period post-reaping
            if(totalUsers/2 > USER_MIN_SIZE)
            {
                console.log("DEBUG: This group is an appropriate size to stay.");
                if(stayVotes < growVotes && growVotes <= totalUsers/2)
                {
                    console.log("DEBUG: Unforunately, there aren't enough GROW votes yet. Maybe next round will work out.");
                    sendMessage("/vote grow");
                }
                else // there are enough GROW votes, and we want to encourage others to STAY with our vote
                {
                    sendMessage("/vote stay");
                }
            }
            else // Not big enough
            {
                if(stayVotes+1 >= USER_MIN_SIZE)
                {
                    sendMessage("/vote stay");
                }
                else
                {
                    console.log("DEBUG: This group is too small for us.");
                    sendMessage("/vote grow");
                    if(totalUsers > 8 && growVotes <= totalUsers/2)
                    {
                        console.log("DEBUG: Not enough GROW votes. Maybe if we leave, the STAYers can make a group.");
    //                    sendMessage("/leave_room");
                        // NOTE: I'm not sure if leaving actually lowers the required number of votes for a STAY majority, but better safe than sorry.
                        //   Comment out the "leave_room" line if you so wish.
                    }
                }
            }
        }
        else
        {
            if(totalUsers/2 > USER_MIN_SIZE)
            {
                console.log("DEBUG: This group is an appropriate size to stay.");
                sendMessage("/vote stay");
            }
            else
            {
                if(stayVotes+1 >= USER_MIN_SIZE)
                {
                    sendMessage("/vote stay");
                }
                else
                {
                    console.log("DEBUG: This group is to small for us.");
                    sendMessage("/vote grow");
                }
            }
        }
    }
})();

function joinRobin()
{
    document.getElementById("joinRobinContainer").click();
    setTimeout(function(){document.getElementById("joinRobin").click();},1000);
    console.log("DEBUG: Joined new chatroom");
}

function sendMessage(message)
{
    $("#robinSendMessage > input[type='text']").val(message);
    $("#robinSendMessage > input[type='submit']").click();
}
