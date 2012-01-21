String.prototype.replaceAt = function(start, end, text) {
	return this.substr(0, start) + text + this.substr(end);
};

var Site = new Class({
	
	initialize: function(){
		this.hideAddressBar();
		this.mobileNav();
	},

	hideAddressBar: function(){
		setTimeout(function(){
			window.scrollTo(0, 1);
		}, 0);
	},

	mobileNav: function(){
		var nav = $$("#nav ul > li"),
			nav2 = $$("#nav select");
		nav.each(function(item, index){
			item = item.getFirst("a");
			nav2.adopt(new Element('option', {
				value: item.get("href"),
				html: item.get("text")
			}));
		});
		$$("#nav select").addEvent("change", function(){
			var selected = this.getElement(":selected");
			window.location = selected.get("value");
		});
	},

	home: function(){
		this.loadTweets();
		this.loadGists(5);
	},

	projects: function(){	
		this.loadGists(10);
	},

	music: function(){
		var lastfm = new Request.JSONP({
			url: 'http://ws.audioscrobbler.com/2.0/',
			callbackKey: 'callback',
			data: {
				format: 'json',
				method: 'user.getRecentTracks',
				user: 'mloberg',
				limit: 10,
				api_key: '75e65c2142c7c0faa7e4c1094bd06e80'
			},
			onRequest: function(){
				$("music").set("html", '<h4 class="center">Loading recently played from Last.fm</h4>');
			},
			onFailure: function(){
				$("music").set("html", '<h4 class="center">Could not load tracks from Last.fm</h4>');
			},
			onComplete: function(data){
				var i = 0,
					str = '';
				Object.each(data.recenttracks.track, function(track){
					var artist = track.artist["#text"],
						album = track.album["#text"],
						url = track.url,
						name = track.name,
						artwork;
					Object.each(track.image, function(image){
						if(image["#text"].match(/\d{3}.?\/\d+\.(png|jpg)/) && !artwork){
							artwork = image["#text"];
						}
					});
					if(i === 0){
						str += '<div class="row recent">';
						str += '<div class="span2 offset4">';
						str += '<img src="' + artwork + '" alt="' + album + '" />';
						str += '</div>';
						str += '<div class="span3">';
						str += '<h3><a href="' + url + '">' + name + '</a></h3>';
						str += '<p>' + artist + '</p>';
						str += '</div>';
						str += '</div>';
						str += '<div class="hr"></div>';
					}else{
						str += '<div class="row">';
						str += '<div class="span12">';
						str += '<h4 class="center">';
						str += '<a href="' + url + '">' + name + '</a>';
						str += '<small> ' + artist + '</small>';
						str += '</h4>';
						str += '</div>';
						str += '</div>';
					}
					i++;
				});
				$("music").set("html", str);
			}
		}).send();
	},

	loadTweets: function(){
		var tweets = new Request.JSONP({
			url: 'https://api.twitter.com/1/statuses/user_timeline.json',
			callbackKey: 'callback',
			data: {
				include_entities: true,
				include_rts: true,
				exclude_replies: true,
				screen_name: 'mloberg',
				count: 5
			},
			onRequest: function(){
				$("tweets").set("html", "<ul><li>Loading Tweets...</li></ul>");
			},
			onFailure: function(){
				$("tweets").set("html", "<ul><li>Could not connect to Twitter.</li></ul>");
			},
			onComplete: function(data){
				var str = '<ul>';
				Object.each(data, function(tweet){
					var text = tweet.text,
						replace = [],
						offset = 0;
					Object.each(tweet.entities.hashtags, function(hashtag){
						replace[hashtag.indices[0]] = {
							start: hashtag.indices[0],
							end: hashtag.indices[1],
							replace: '<a href="http://twitter.com/search/%23' + hashtag.text + '">#' + hashtag.text + '</a>'
						};
					});
					Object.each(tweet.entities.user_mentions, function(user){
						replace[user.indices[0]] = {
							start: user.indices[0],
							end: user.indices[1],
							replace: '<a href="http://twitter.com/' + user.screen_name + '">@' + user.screen_name + '</a>'
						};
					});
					Object.each(tweet.entities.urls, function(url){
						replace[url.indices[0]] = {
							start: url.indices[0],
							end: url.indices[1],
							replace: '<a href="' + url.expanded_url + '">' + url.display_url + '</a>'
						};
					});
					Array.each(replace, function(value, key){
						text = text.replaceAt(value.start + offset, value.end + offset, value.replace);
						offset += value.replace.length - (value.end - value.start);
					});
					str += '<li>' + text + '</li>';
				});
				str += '</ul>';
				$("tweets").set("html", str);
			}
		}).send();
	},

	loadGists: function(limit){
		var gists = new Request.JSONP({
			url: 'https://api.github.com/users/mloberg/gists',
			callbackKey: 'callback',
			onRequest: function(){
				$("gists").set("html", "<ul><li>Loading Gists...</li></ul>");
			},
			onFailure: function(){
				$("gists").set("html", "<ul><li>Could not load Gists.</li></ul>");
			},
			onComplete: function(data){
				var str = '<ul>',
					i = 0;
				Object.each(data.data, function(gist){
					if(i < limit){
						str += '<li><a href="' + gist.html_url + '">' + gist.description + '</a></li>';
					}
					i++;
				});
				str += '</ul>';
				$("gists").set("html", str);
			}
		}).send();
	}

});