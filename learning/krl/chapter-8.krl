ruleset b506395x12
{
//  Source code at https://raw.githubusercontent.com/eisbaerBorealis/krl-tests/master/chapter-8.krl
//  Flush ruleset at cs.kobj.net/ruleset/flush/b506395x12.prod
//  Test at http://ktest.herokuapp.com/b506395x12

//  The following will be displayed in basic text: movie thumbnail, title, release year, rating, runtime, synopsis, critic ratings, review count, and audience score.

//  Rotten Tomatoes API Key: s66bcnj5r8bygp7g7fvbje4c
	meta
	{
		name "rotten tomatoes api exercise"
		author "Jesse Howell"
		logging on
	}
	
//	2. Define a function in the global block of the ruleset that uses http:get() to interact with the movies.json endpoint of the Rotten Tomatoes API. Be sure to include your API key as the first argument of the query string. Note that if you can't retrieve the data using curl or a browser, your function won't be able to either. 
	global
	{
//		datasource rotten_tomatoes_api <- "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=s66bcnj5r8bygp7g7fvbje4c";
		
		clear_divs = defaction()
		{
			title = 'divs "movie" and "options"';
			message = 'have been cleared';
			{
				notify(title, message) with sticky = true;
//				notify("divs \"movie\" and \"options\"", "have been cleared") with sticky = true;
				replace_inner("#movie", "");
				replace_inner("#options", "");
			}
		}
		
/*		search_database = defaction(title)
		{
			title_plus = title.replace(re/ /g,"+");
			movie_search = http:get("http://api.rottentomatoes.com/api/public/v1.0/movies.json",
							{"apikey": "s66bcnj5r8bygp7g7fvbje4c", "q": title_plus});
			movie_array = movie_search.pick("$.content").decode().pick("$.movies");
			top_movie_id = movie_array[0]{"id"};
			every
			{
				clear_divs();
//				title_plus = title.replace(re/ /g,"+");
				notify("Testing movie search:", title_plus) with sticky = true;
//				movie_search = http:get("http://api.rottentomatoes.com/api/public/v1.0/movies.json",
//							{"apikey": "s66bcnj5r8bygp7g7fvbje4c", "q": title_plus});
				
//				movie_array = movie_search.pick("$.content").decode().pick("$.movies");
//				top_movie_id = movie_array[0]{"id"};
				
				if movie_array.length()>1 then
				{
					replace_inner("#options", "Not what you were looking for?");
					
					foreach movie_array setting (movie)
						options_html = "<br><a href = \"http://ktest.kerokuapp.com/b506395x12?rt_id=" + movie{"id"} + "\">" + movie{"title"} + "</a>";
						append("#options", options_html);
				}
				
				notify("Top Search:", "top_movie_id ") with sticky = true;
				
//				get_movie(top_movie_id);
			}
		}*/
		
//		get_movie = function(movie_id)
//		{
//			
//		}
	}

	//  Confirms that the cache has been flushed, and the displayed page matches the recent updates
	rule version_check
	{
		select when pageview ".*"
		{
			notify("Version Number", "009, 2015.01.27 17.14")
				with background_color = "#346"
				and sticky = true
				and color = "#CC9";
		}
	}

	//  destroys the unwanted text and sets up the wrappers, backgrounds, and empty divs
	//  Note: might be cleaner to use replace_inner rather than replace_html
	rule initialize_divs
	{
		select when pageview ".*"
		pre
		{
			empty_html = << >>;
			
			head_html = <<
				<style type = "text/css">
					body {background: #3A9425;}
					div#outer-wrapper {width: 660px; margin: 50px auto; background: #FFF}
					div#inner-wrapper {margin: 0px 30px; padding: 30px 0px;}
				</style> >>;
			
			main_html = <<
				<div id = "main">
					<div id = "outer-wrapper">
						<div id = "inner-wrapper">
							<div id = "movie"></div>
							<div id = "options"></div>
							<div id = "search">Search div</div>
						</div>
					</div>
				</div> >>;

			search_html = <<
				<div id = "search">
					Search for a movie title!<br>
					<form id = "film_search">
						<input type = "text" name = "movie_title" size = "30">
						<input type = "submit" value = "Search">
					</form>
				</div> >>;
		}
		{
			append($("head"), head_html);
			replace_html("#header", empty_html);
			replace_html("#footer", empty_html);
			replace_html("#main", main_html);

			replace_html("#search", search_html);
			watch("#film_search", "submit");
		}
	}


	rule on_search
	{
		select when web submit "#film_search"
		pre
		{
			input = event:attr("movie_title");
		}
		{
			notify("Database searched", "for " + input) with sticky = true;
			clear_divs();
//			search_database(input);
		}
	}
}