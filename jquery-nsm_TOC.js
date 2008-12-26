// jquery-nsmTOC.js - A jQuery Plugin
// Version 1.0.0
// Written by Leevi Graham - Technical Director - Newism Web Design & Development
// http://newism.com.au
// Notes: 
// Still a work in progress
// Inspired By:
// http://code.google.com/p/jqplanize/
// http://blog.rebeccamurphey.com/2007/12/24/jquery-table-of-contents-plugin-nested/

// create closure
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
						toc_marker += levels[l] > 0 ? levels[l] + o.number_separator : '';
					}

					// get rid of the last seperator
					toc_marker = prependText = toc_marker.substring(0, toc_marker.length - 1);

					// add a number suffix?
					prependText = toc_marker + o.number_suffix;

					// do the titles
					$self.prepend('<span id="' + o.hash_prefix + toc_marker + '" class="' + o.header_span_class + '">' + prependText + '</span> ');
					if(o.add_top_links)
					{
						$self.append(" <a href='" + o.top_link_target + "' class='" + o.top_link_class + "'>Top</a>");
					}

					// do the link
					$li.addClass($self.attr("class")).prepend('<a href="#' + o.hash_prefix + toc_marker + '"><span>' + prependText + '</span> ' + text + '</a>');

				}
				
			});
			$(o.toc_el).append($toc);
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
		generate_toc:		true, 
		toc_title:			false,
		toc_el:				"body",
		ignore: 			".toc-ignore",
		hash_prefix: 		"toc-",
		min_depth:			1,
		max_depth: 			6,
		number_suffix:		".",
		number_separator: 	".",
		debug: 				true,
		header_span_class: 	"toc-marker",
		add_top_links: 		true,
		top_link_target: 	"#",
		top_link_class: 	"top"
	};

// end of closure
})(jQuery);