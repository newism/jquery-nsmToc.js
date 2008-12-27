This file is written using the MarkDown syntax. It may or may not have been parsed. If you are having trouble reading it try running the contents through http://daringfireball.net/projects/markdown/dingus.

---

nsm_TOC.js - A jQuey plugin to create a table of contents from HTML markup.
===========================================================================

**Author**: [Leevi Graham](leevi@newism.com.au) - Technical Director, [Newism Pty Ltd][]  
**Version**: 1.0.0  
**Git Master Repository**: &lt;http://github.com/newism/nsm.toc.jquery_plugin/tree/master&gt;

About
-----

nsm_TOC.js is a jQuery plugin that generates a nested &lt;ul&gt; table of contents based on header tags &lt;h*n*&gt; in your html markup. 

Other features include: 

* TOC markers prepended to each heading element (optional) which are reflected in the TOC ie: 1.2.3 - Heading 1.
* "top links" appended to each heading element (optional) ie: &lt;a href="#top"&gt;Top&lt;/a&gt;

Usage
-----

	nsm_TOC(options)

### Examples

	$('body').nsm_TOC();  
	$('body').nsm_TOC({ hash_prefix: "h-"}); // Changes the hash prefix for the TOC links  
	$('body').nsm_TOC({ min_depth: 2, max_depth: 5}); // Creates a TOC using heading elments 2-5 nested in the target element  
	$('body').nsm_TOC({ add_top_links: false}); // Doesn't add top links to heading elements  

### Options

Hash of options, optional.

#### **append\_toc**
{Boolean} Append the generated TOC to the toc_el

#### **toc\_el**
{String, DOMElement, jQuery} The element that the TOC will be appended to.

#### **ignore**
{String, DOMElement, jQuery} A collection of header elements which are not included in the TOC.

#### **hash\_prefix**
{String} The string prepended to the anchor hash target.

#### **min\_depth**
{Number} The minimun header element to include. Ex: "1" will build the TOC starting with &lt;h1&gt; elements while "2" will build the TOC starting with &lt;h2&gt; elements.

#### **max\_depth**
{Number} The max header element to include. Ex: "5" will build the TOC stopping at (but including) &lt;h5&gt; elements while "6" will build the TOC stopping at (but including) &lt;h6&gt; elements.

#### **prepend\_toc\_marker**
{Boolean} Prepend TOC markers to the header elements and the TOC list items.

#### **toc\_marker\_suffix**
{String} The string added after the toc marker. Ex: If the TOC marker is 1.1.1 and the toc_marker_suffix is "." the final output will be: "1.1.1." If the TOC Marker is 1.2.3 and the number suffix is ")" the final output will be "1.2.3)".

#### **toc\_marker\_seperator**
{String} The string that divides the toc_marker levels. Ex: If the TOC marker levels are 1,1 & 1 and the toc_marker_seperator is "." the final output will be: "1.1.1" If the TOC marker levels are 1,1 & 1 and the toc_marker_seperator is "-" the final output will be: "1-1-1".

#### **toc\_marker\_class**
{String} The class to add to the header and TOC list element toc_marker span. Ex: &lt;span class="toc-marker"&gt;1.2.3&lt;/span&gt;.

#### **append\_top\_links**
{Boolean} Add top links to each heading element in the TOC. Ex: &lt;h1&gt;&lt;span class="toc-marker"&gt;1&lt;/span&gt; Heading 1 &lt;a href="#top"&gt;Top&lt;/a&gt;&lt;/h1&gt;.

#### **top\_link\_class**
{String} The class to add to the top link anchor element. Ex: &lt;a href="#top" class="top"&gt;Top&lt;/a&gt;.

### Returns

Returns the same jQuery object, for chaining.



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