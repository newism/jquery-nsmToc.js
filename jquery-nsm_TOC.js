// jquery-nsmTOC.js - A jQuery Plugin
// Version 1.0.0
// Written by Leevi Graham - Technical Director - Newism Web Design & Development
// http://newism.com.au
// Notes: 
// Still a work in progress
// Inspired By - http://code.google.com/p/jqplanize/ & http://blog.rebeccamurphey.com/2007/12/24/jquery-table-of-contents-plugin-nested/

// create closure
(function($) {
	// plugin definition
	$.fn.nsmTOC = function(options) {

		//console.log("nsm_TOC selection count: %c", this.size());

		// build main options before element iteration
		var opts = $.extend({}, $.fn.nsmTOC.defaults, options);

		// iterate and reformat each matched element
		return this.each(function() {

			var $self 			= $(this);
			var lastDepth		= 0;
			var levels			= [0,0,0,0,0,0];
			var hLevelText		= "";
			var prependText 	= "";
			var prevLevel		= 0;
			var n				= 0;

			var $toc = $("<ul></ul>").addClass("l-"+lastDepth);
			var $current_ul = $toc;
			var anchorList =  new Array();

			var o = $.meta ? $.extend({}, opts, $self.data()) : opts;

			$("*:header:visible", $self).each(function(index, heading) {

				var $self 		= $(this);
				var	text		= $self.text();

				hDepth = parseInt(heading.tagName.substring(1));

				if (o.min_depth <= hDepth && hDepth <= o.max_depth) {

					//console.log("Processing heading %o", heading);

					// set the depth
					depth = hDepth - o.min_depth;
					toc_marker = "";

					var $li = $("<li>");

					// same depth
					if (depth == lastDepth) {
						//console.log("same depth (" + depth + ")");
						$current_ul.append($li);
						levels[depth]++;
						levels[depth + 1] = 0;
						//console.log(levels.join("."));
					// going deeper
					} else if (depth > lastDepth) {
						while(depth > lastDepth)
						{
							//console.log("nesting because:" + depth + ">" + lastDepth);
							levels[lastDepth + 1]++;
							levels[lastDepth + 2] = 0;
							lastDepth++;
							//console.log(levels.join("."));
							$new_ul = $("<ul></ul>").addClass("l-"+lastDepth);
							if(!$("li:last", $current_ul).length){
								$current_ul.append("<li>");
							}
							$("li:last", $current_ul).append($new_ul);
							$current_ul = $new_ul;
						}
						$current_ul.append($li);
					// rising up
					} else if (depth < lastDepth) {
						while(depth < lastDepth)
						{
							//console.log("unnesting because:" + depth + "<" + lastDepth);
							levels[lastDepth - 1]++;
							levels[lastDepth] = 0;
							lastDepth--;
							//console.log(levels.join("."));
							$current_ul = $current_ul.parent().parent();
						}
						$current_ul.append($li);
					}
					
					for (var l = 0; l <= depth; l++) {
						toc_marker += levels[l] > 0 ? levels[l] + o.number_separator : '';
					}

					toc_marker = prependText = toc_marker.substring(0, toc_marker.length - 1);

					if (o.number_suffix) {
						prependText = toc_marker + o.number_suffix;
					}

					//console.log(hLevelText);
					//console.log($li);
					//console.log(" ");

					// do the titles
					hPrependText = '<span id="h' + toc_marker + '" class="' + o.header_span_class + '">'+ prependText+'</span>';
					$self.prepend(hPrependText + " ");

					// do the link
					$li.addClass($self.attr("class")).prepend('<a href="#h'+toc_marker+'"><span>' + prependText + '</span> '+text+'</a>');

				}
				
			});

			$(o.toc_el).append($toc);
		});
	}

	// private function for debugging
	function hLevelText()
	{

	};

	// plugin defaults
	$.fn.nsmTOC.defaults = {
		generate_toc:		true, 
		toc_title:			false,
		toc_el:				"body",
		min_depth:			1,
		max_depth: 			6,
		number_suffix:		".",
		number_separator: 	".",
		debug: 				true,
		header_span_class: 	"toc-marker"
	};

// end of closure
})(jQuery);