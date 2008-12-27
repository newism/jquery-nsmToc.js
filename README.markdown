nsm_TOC.js - A jQuey plugin to create a table of contents from HTML markup.
===========================================================================

**Author**: [Leevi Graham](leevi@newism.com.au) - Technical Director, [Newism Pty Ltd][]  
**Version**: 1.0.0  
**Git Master Repository**: <http://github.com/newism/nsm.toc.jquery_plugin/tree/master>

About
-----

nsm_TOC.js is a jQuery plugin that generates a nested &lt;ul&gt; table of contents based on header tags &lt;h*n*&gt; in your html markup. 

Other features include: 

* TOC markers prepended to each heading element (optional) which are reflected in the TOC ie: 1.2.3 - Heading 1.
* "top links" appended to each heading element (optional) ie: <a href="#top">Top</a>

Usage
-----

	nsm_TOC(options)

### Examples

	$('body').nsm_TOC();  
	$('body').nsm_TOC({ hash_prefix: "h-"}); // Changes the hash prefix for the TOC links  
	$('body').nsm_TOC({ min_depth: 2, max_depth: 5}); // Creates a TOC using heading elments 2-5 nested in the target element  
	$('body').nsm_TOC({ add_top_links: false}); // Doesn't add top links to heading elements  

### Arguments


License
-------

nsm_TOC.js is currently available for use in all personal or commercial projects under [Creative Commons Attribution-Share Alike 3.0 Unported][] license.

You are free to:

* **Share** - to copy, distribute and transmit the work
* **Remix** - to adapt the work

Under the following conditions:

* **Attribution** - You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
* **Share Alike** - If you alter, transform, or build upon this work, you may distribute the resulting work only under the same, similar or a compatible license.

[Newism Pty Ltd]: http://newism.com.au/
[Creative Commons Attribution-Share Alike 3.0 Unported]: http://creativecommons.org/licenses/by-sa/3.0/ 