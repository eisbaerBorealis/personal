ruleset b506395x10 {
	meta {
		name "notify exercise"
		author "Jesse Howell"
		logging off
	}
	dispatch {
	// domain "exampley.com"
	}
	rule first_rule {
		select when pageview ".*" {
			notify("Hello World", "This is a sample rule.")
				with background_color = "#346"
				and sticky = true
				and color = "#CC9";
			notify("Hello World 2", "This is a second sample rule.")
				with sticky = true
				and background_color = "#A34";
		}
	}
	
	rule second_rule {
		select when pageview ".*"
		pre	{
			get_name = function(query_text)
			{
				name = query_text.extract(re/name=([^&]+)/);
				name = name.length() > 0 => name[0] | "Monkey";
				name;
			};
			name = get_name(page:url("query"));
		}
		{
			notify("Hello, " + name, "") with sticky = true;
		}
	}
	
	rule third_rule {
		select when pageview ".*"
		pre {
			visits = ent:visit_count + 1;
		}
		if visits <= 5 then
			notify("Welcome, [relatively] new user!", visits + " visits so far")
				with sticky = true;
		fired {
			ent:visit_count += 1 from 1;
		}
	}
	
	rule fourth_rule {
		select when pageview ".*"
		
		pre {
		
		}
		if page:url("query").match(re/clear=/) then
			notify("View count cleared", "");
		fired {
			clear ent:visit_count;
		}
	}
}