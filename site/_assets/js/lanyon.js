(function(window, document) {
	var toggle = document.querySelector('.sidebar-toggle');
	var sidebar = document.querySelector('#sidebar');
	var checkbox = document.querySelector('#sidebar-checkbox');

	if (-1 !== window.location.search.indexOf('sidebar=1')) {
			checkbox.checked = true;
	}

	document.addEventListener('click', function(e) {
		var target = e.target;

		if(!checkbox.checked ||
			 sidebar.contains(target) ||
			 (target === checkbox || target === toggle)) return;

		checkbox.checked = false;
	}, false);
})(window, document);
