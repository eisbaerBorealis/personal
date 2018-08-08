ruleset b506395x13
{
//  Source code at https://raw.githubusercontent.com/eisbaerBorealis/krl-tests/master/test-divs.krl
//  Flush ruleset at cs.kobj.net/ruleset/flush/b506395x13.prod
//  Test at http://ktest.herokuapp.com/b506395x13

	meta
	{
		name "testing html replace function"
		author "Jesse Howell"
		logging on
	}
	 
	global
	{
		
	}

	//  Confirms that the cache has been flushed, and the displayed page matches the recent updates
	rule version_check
	{
		select when pageview ".*"
		{
			notify("Version Number", "005, 2015.01.06 17.43")
				with background_color = "#346"
				and sticky = true
				and color = "#CC9";
		}
	}

	//  If successful, this will show that one may add divs to the "main" div, then replace and/or add to them in any order afterwards.
	rule div_manip
	{
		select when pageview ".*"
		pre
		{
			my_html = <<
				<div id = "main" style = "background: #3A9425;">
					<div id = "div1"></div>
					<div id = "div2"></div>
					<div id = "div3"></div>
				</div> 	>>;

			my_html_1 = <<
				<div id = "div1"><p>Div 1 text</p></div> >>;

			my_html_2 = <<
				<div id = "div2"><p>Div 2 text</p></div> >>;

			my_html_3 = <<
				<div id = "div3"><p>Div 3 text</p></div> >>;

			empty_html = << >>;
		}
		{
			replace_html("#main", my_html);
			replace_html("#div2", my_html_2);
			replace_html("#div3", my_html_3);
			replace_html("#div1", my_html_1);
			replace_html("#header", empty_html);
			replace_html("#footer", empty_html);
		}
	}

	//  Affect the body tag?
	rule change_bg
	{
		select when pageview ".*"
		pre
		{
			body_html = <<
				  <body style = "background: #3A9425;">
				  </body> >>;
		}
		{
			replace_html("#body", body_html);
			notify("Replace attempted", "")
				with sticky = true;
		}
	}
}