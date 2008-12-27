/**
* jQuery.nsm_TOC
* Copyright (c) 2008-2009 Newmso - leevi(at)newism(dot)com(dot)au | http://newism.com.au
* Licensed under Creative Commons Attribution-Share Alike 3.0 Unported license. | http://creativecommons.org/licenses/by-sa/3.0/
* Date: 27 Dec 2008
*
* @projectDescription Generate a table of contents based on header tags in your html markup.
* http://newism.com.au
*
* @author Leevi Graham - Technical Director, Newism Pty Ltd
* @version 1.0.0
* @requires jQuery 1.2+ http://jquery.com
* @see http://github.com/newism/nsm.toc.jquery_plugin/tree/master
*
* @id jQuery.nsm_TOC
* @id jQuery.fn.nsm_TOC
* @param {Object} settings Hash of settings, optional.
*	 @option {Boolean} append_toc Append the generated TOC to the toc_el
*	 @option {String, DOMElement, jQuery, Object} toc_el The element that the TOC will be appended to
*	 @option {String, DOMElement, jQuery} ignore A collection of header elements which are not included in the TOC.
*	 @option {String} hash_prefix The string prepended to the anchor hash target.
*	 @option {Number} min_depth The minimun header element to include. Ex: "1" will build the TOC starting with <h1> elements while "2" will build the TOC starting with <h2> elements
*	 @option {Number} max_depth The max header element to include. Ex: "5" will build the TOC stopping at (but including) <h5> elements while "6" will build the TOC stopping at (but including) <h6> elements
*	 @option {Boolean} prepend_toc_marker Prepend TOC markers to the header elements
*	 @option {String} toc_marker_suffix The string added after the toc marker. Ex: If the TOC marker is 1.1.1 and the toc_marker_suffix is "." the final output will be: "1.1.1." If the TOC Marker is 1.2.3 and the number suffix is ")" the final output will be "1.2.3)"
*	 @option {String} toc_marker_seperator The string that divides the toc_marker levels. Ex: If the TOC marker levels are 1,1 & 1 and the toc_marker_seperator is "." the final output will be: "1.1.1" If the TOC marker levels are 1,1 & 1 and the toc_marker_seperator is "-" the final output will be: "1-1-1"
*	 @option {Boolean} debug Diplay console messages
*	 @option {String} header_span_class The class to add to the header toc_marker span element. Ex: <span class="toc-marker">1.2.3</span>
*	 @option {Boolean} append_top_links Add top links to each heading element in the TOC. Ex: <h1><span class="toc-marker">1</span> Heading 1 <a href="#top">Top</a></h1>
*	 @option {String} top_link_class The class to add to the top link anchor element. Ex: <a href="#top" class="top">Top</a>
* @return {jQuery} Returns the same jQuery object, for chaining.
*
* @example $('body').nsm_TOC();
*
* @example $('body').nsm_TOC({ hash_prefix: "h-"}); // Changes the hash prefix for the TOC links
* @example $('body').nsm_TOC({ min_depth: 2, max_depth: 5}); // Creates a TOC using heading elments 2-5 nested in the target element
* @example $('body').nsm_TOC({ add_top_links: false}); // Doesn't add top links to heading elements
*
* Notes:
*  - Influenced by: http://code.google.com/p/jqplanize/ & http://blog.rebeccamurphey.com/2007/12/24/jquery-table-of-contents-plugin-nested/
*	- Still a work in progress
*	- Not tested on all platforms
*/

(function($) {
	// plugin definition
	$.fn.nsmTOC = function(options) {

		log("nsm_TOC.js selection count: %c", this.size());

		// build main options before element iteration
		var opts = $.extend({}, $.fn.nsmTOC.defaults, options);

		// iterate and reformat each matched element
		return this.each(function() {

			var $self 			= $(this);
			var lastDepth		= 0;
			var levels			= [0,0,0,0,0,0];

			var $toc = $current_ul = $('<ul class="l-'+lastDepth+'">');

			var o = $.meta ? $.extend({}, opts, $self.data()) : opts;

			$("*:header:visible", $self).each(function(index, heading) {

				var $self 		= $(this);
				var text		= $self.text().replace(/>/g, "&gt;").replace(/</g, "&lt;");
				var hDepth 		= parseInt(heading.tagName.substring(1));
				var depth 		= hDepth - o.min_depth;

				if (o.min_depth <= hDepth && hDepth <= o.max_depth && !$self.is(o.ignore)) {

					log("\nProcessing heading %o", heading);

					var $li = $("<li>");

					// same depth
					if (depth == lastDepth) {
						$current_ul.append($li);
						levels[depth]++;
						levels[depth + 1] = 0;
						log("same depth (" + depth + ")");
						log("levels: %o", levels.join("."));
					// going deeper
					} else if (depth > lastDepth) {
						while(depth > lastDepth)
						{
							//log("nesting because:" + depth + ">" + lastDepth);
							levels[lastDepth + 1]++;
							levels[lastDepth + 2] = 0;
							lastDepth++;
							log("levels: %o", levels.join("."));
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
							log("unnesting because:" + depth + "<" + lastDepth);
							levels[lastDepth - 1]++;
							levels[lastDepth] = 0;
							lastDepth--;
							log("levels: %o", levels.join("."));
							$current_ul = $current_ul.parent().parent();
						}
						$current_ul.append($li);
					}

					// TOC integer marker
					toc_marker = "";

					//  build the marker
					for (var l = 0; l <= depth; l++) {
						toc_marker += levels[l] > 0 ? levels[l] + o.toc_marker_separator : '';
					}

					// get rid of the last seperator
					toc_marker = prependText = toc_marker.substring(0, toc_marker.length - 1);

					// add a number suffix?
					prependText = toc_marker + o.toc_marker_suffix;

					// do the titles
					if(o.prepend_toc_marker)
					{
						$self.prepend('<span id="' + o.hash_prefix + toc_marker + '" class="' + o.header_span_class + '">' + prependText + '</span> ');
					}
					if(o.append_top_links)
					{
						$self.append(" <a href='" + o.top_link_href + "' class='" + o.top_link_class + "'>Top</a>");
					}

					// do the link
					$li.addClass($self.attr("class")).prepend('<a href="#' + o.hash_prefix + toc_marker + '"><span>' + prependText + '</span> ' + text + '</a>');

				}
				
			});
			if(o.append_toc)
			{
				$(o.toc_el).append($toc);
			}
		});

		function log() {
			if (!$.fn.nsmTOC.defaults.debug) {
				return;
			}
			try {
				console.log.apply(console, arguments);
			} catch(e) {
				try {
					opera.postError.apply(opera, arguments);
				} catch(e){}
			}
		}
	}

	// plugin defaults
	$.fn.nsmTOC.defaults = {
		append_toc:				true, 
		toc_el:					"body",
		ignore: 				".toc-ignore",
		hash_prefix: 			"toc-",
		min_depth:				1,
		max_depth: 				6,
		prepend_toc_marker:		true,
		toc_marker_suffix:		".",
		toc_marker_separator: 	".",
		debug:					true,
		header_span_class:		"toc-marker",
		append_top_links:		true,
		top_link_href:			"#",
		top_link_class:			"top"
	};

// end of closure
})(jQuery);