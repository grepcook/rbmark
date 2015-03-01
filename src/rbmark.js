function getRandomBookmark() {
	var allBookmarks = [];

	chrome.bookmarks.getSubTree("0", function (root){
		function traverse(bmNodes) {
			var n = bmNodes.length;
			var i;
			for (i = 0; i < n; ++i) {
				var node = bmNodes[i];
				if(node.children !== undefined) {
					var children = node.children;
					var n = children.length;
					if (n !== 0)
						traverse(children);
				}
				else
					allBookmarks.push(node);
			}
		}
		
		var n = root.length;
		var i;
		for (i = 0; i < n; ++i) {
			var bmNodes = root[i].children;
			traverse(bmNodes);
		}
		var length = allBookmarks.length;
		if (length !== 0) {
			var index = getRandomInt(0, length);
			var bookmark = allBookmarks[index];
			var url = bookmark.url;
			console.log("request " + url);
			window.location.replace(url);
			//window.location.href = url;
		}
	});
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

getRandomBookmark();