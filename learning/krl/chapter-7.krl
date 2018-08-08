ruleset b506395x11
{
//  Source code at https://raw.githubusercontent.com/eisbaerBorealis/krl-tests/master/chapter-7.krl
//  Flush ruleset at cs.kobj.net/ruleset/flush/b506395x11.prod
//  Test at http://ktest.herokuapp.com/b506395x11
	meta
	{
		name "web rule exercise"
		author "Jesse Howell"
		logging on
	}
	dispatch
	{
	// domain "exampley.com"
	}

	//  Confirms that the cache has been flushed, and the displayed page matches the recent updates
	rule version_check
	{
		select when pageview ".*"
		{
			notify("Version Number", "016, 2014.11.29 22.25")
				with background_color = "#346"
				and sticky = true
				and color = "#CC9";
		}
	}

	//  1. Write a rule called show_form that inserts text paragraph (make up the text) in the <div/> element with the ID of main on ktest.heroku.com
	//  2. Modify the show_form rule from (1) to place a simple Web form that has fields for a first name, a last name, and a submit button. Use the watch() action to watch it for activity.
	rule show_form
	{
		select when pageview ".*"
		pre
		{
			my_html = <<
				<div id = "main">
					<form id = "user_form">
						First Name:<br>
						<input type = "text" name = "first_name"><br>
						Last Name:<br>
						<input type = "text" name = "last_name"><br>
						<input type = "submit" value = "Submit">
					</form>
				</div>
			>>;
		}
		{
			replace_html("#main", my_html);
			watch("#user_form", "submit");
		}
	}

	//  5. Add a clear rule that clears the names if the query string clear=1 is added to the URL.
	//     Test with http://ktest.herokuapp.com/b506395x11?clear=1
	rule clear_name
	{
		select when pageview ".*"
		pre
		{

		}
		if page:url("query").match(re/clear=1/) then
		{
			notify("Name cleared", "");
		}
		fired
		{
			clear ent:username;
		}
	}
	
	//  3. Write a rule that selects on submit and takes the first and last name from the form in (2) and stores them in entity variables.
	//  4. Modify the ruleset so that if a first and last name have been stored, they are displayed in the page (in a paragraph under the form) and if they are not, the form is displayed.
	rule on_submit
	{
		select when web submit "#user_form"
		pre
		{
			input = event:attr("first_name") + " " + event:attr("last_name");
		}
		{
			replace_inner("#main", "Hello, #{input}");
			notify("Submit verification", "User's name has been saved as an entity variable");
		}
		fired
		{
			set ent:username input;
		}
	}

	rule name_stored
	{
		select when pageview ".*"
		pre
		{
			input = ent:username;
		}
		if input.length() > 0 then
		{
			replace_inner("#main", "Hello, #{input}");
			notify("Name Saved verification", "rule name_stored has fired.");
		}
	}
}