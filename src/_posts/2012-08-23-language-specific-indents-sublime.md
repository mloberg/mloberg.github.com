---
layout: post
title: Language Specific Indents In Sublime Text 2
---
Ask any developer spaces or tabs and you'll get different responses. I was hardcore in the tabs camp until recently. Now I'm trying to use spaces. The biggest issue with using spaces 100% was my text editor. I use Sublime, and tried to set it to use spaces by default, but couldn't seem to get it to work (later I would find out it was a mis-typed option). So every time I would create a new document I would set the tab size (2 for Ruby, 4 for PHP and Python) and covert it to spaces. Half the time I would forget to do this, so I would end up with projects half in spaces and half in tabs. Today I finally got sick of doing this every time, so I set out determined to figure this out once and for all, and I did.

One of the things I like about Sublime (and vim as well) is you can customize pretty much every thing to your liking. There are default settings in Sublime that you can modify, or you can create user settings that will override the default options (which is the preferred method). There are also syntax or language specific settings. We're going to focus on how to modify the syntax specific settings. There are two methods of doing this.

#### The Hard Way

This is how I modified my settings. There is a much easier way to do this, that I found out after I had done it this way.

Sublime stores all of it's settings and completions in directory structure on disk. On OS X it's located in *~/Library/Application Support/Sublime Text 2*. All of the syntax specific settings are in the *Packages* directory. If you want to modify the settings for Ruby, you would edit *~/Libra/Application Support/Sublime Text 2/Packages/Ruby/Ruby.sublime-settings*. Remember how Sublime has default and user settings? This is the default setting for Ruby, you want to modify the user settings. This is something I realized after the fact. You'll instead want to edit *~/Libra/Application Support/Sublime Text 2/Packages/User/Ruby.sublime-settings*.

#### The Easy Way

After I had modified the settings manually, I was playing around with Sublime's settings and found a way to edit syntax specific settings right in Sublime (Sublime Text 2 -> Preferences -> Settings - More -> Syntax Specific - User). When you click this, it will open up a settings file for the language you are currently working in. So if you want to edit settings for PHP, you'll have to open a PHP file and click *Syntax Specific*.

#### The Settings

I've showed you how to modify syntax specific settings, but what's the actual code for using spaces instead of tabs? As you may or may not know, Sublime settings are in JSON format. Unless you've already created a settings file for the language, you'll have to create the structure first, which is just a set of curly braces (`{}`).

There are two settings that deal with tabs/spaces. The first is the tabSize (`tab_size`) and the second is translateTabsToSpaces (`translate_tabs_to_spaces`). Tab size is an integer and deals with, you guessed it, the tab size length. If you are using tabs, this will define how tabs are spaced. The Sublime default is 4. Translate tabs to spaces is a Boolean and defines the use of spaces vs. tabs. If you set it to true, it will use spaces (as defined by tabSize). If it is false (which is the Sublime default), it will use tabs.

	{
		"tab_size": 2,
		"translate_tabs_to_spaces": true
	}

*My Ruby settings*

	{
		"tab_size": 4,
		"translate_tabs_to_spaces": true
	}

*My PHP and Python settings*

You can also set other settings such as the color scheme, whether or not to use spell check or any other Sublime setting.
