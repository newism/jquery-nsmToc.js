nsm_TOC.js - A jQuery plugin to create a table of contents from HTML markup.
===========================================================================

**Author**: [Leevi Graham][] - Technical Director, [Newism Pty Ltd][]  
**Git Master Repository**: <http://github.com/newism/nsm.toc.jquery_plugin/tree/master>

About
-----

nsm_TOC.js is a jQuery plugin that generates a nested <code>&lt;ul&gt;</code> table of contents based on header tags <code>&lt;h<em>n</em>&gt;</code> in your html markup. The TOC list item content is pulled from the title attribute of the heading element and falls back to the element content.

Other features include:

* TOC markers prepended to each heading element (optional) which are reflected in the TOC eg: 1.2.3 - Heading 1.
* "top links" appended to each heading element (optional) eg: <code>&lt;a href="#top"&gt;Top&lt;/a&gt;</code>
* Support for non-linear headings preserving toc markers: <code>&lt;h1&gt;Heading 1&lt;/h1&gt; &lt;h2&gt;Heading 2&lt;/h2&gt; &lt;h4&gt;Heading 4&lt;/h4&gt;</code>

Usage
-----

	nsm_TOC(options)

### Examples

	$('body').nsm_TOC();
	$('body').nsm_TOC({ hash_prefix: "h-"}); // Changes the hash prefix for the TOC links
	$('body').nsm_TOC({ start_depth: 2, end_depth: 5}); // Creates a TOC using heading elments 2-5 nested in the target element
	$('body').nsm_TOC({ append_top_links: false}); // Doesn't add top links to heading elements

### Example TOC output:

	<div id="toc">
	  <ul class="l-0">
	    <li><a href="#toc-1"><span class="toc-marker">1.</span> General Markup - p, a, strong, em, del, ins, abbr, accronym, sub, sup, blockquote cite</a>
	      <ul class="l-1">
	        <li><a href="#toc-1.1"><span class="toc-marker">1.1.</span> strong, cite, em, a</a></li>
	        <li><a href="#toc-1.2"><span class="toc-marker">1.2.</span> a[rel=external], del, ins</a></li>
	        <li><a href="#toc-1.3"><span class="toc-marker">1.3.</span> sub, sup</a></li>
	        <li><a href="#toc-1.4"><span class="toc-marker">1.4.</span> abbr, acronym</a></li>
	        <li><a href="#toc-1.5"><span class="toc-marker">1.5.</span> Combination styles - a, stong, em</a></li>
	        <li><a href="#toc-1.6"><span class="toc-marker">1.6.</span> Blockquotes</a></li>
	      </ul>
	    </li>
	    <li><a href="#toc-2"><span class="toc-marker">2.</span> Lists - ul, ol, dl</a>
	      <ul class="l-1">
	        <li><a href="#toc-2.1"><span class="toc-marker">2.1.</span> Un-ordered list</a></li>
	        <li><a href="#toc-2.2"><span class="toc-marker">2.2.</span> Ordered list</a></li>
	        <li><a href="#toc-2.3"><span class="toc-marker">2.3.</span> Definition List</a></li>
	        <li><a href="#toc-2.4"><span class="toc-marker">2.4.</span> Nested Lists</a></li>
	      </ul>
	    </li>
	    <li><a href="#toc-3"><span class="toc-marker">3.</span> Tables</a></li>
	    <li><a href="#toc-4"><span class="toc-marker">4.</span> Forms</a></li>
	    <li><a href="#toc-5"><span class="toc-marker">5.</span> Embedded Object</a></li>
	    <li><a href="#toc-6"><span class="toc-marker">6.</span> Heading Tag Spacing</a></li>
	    <li><a href="#toc-7"><span class="toc-marker">7.</span> Figures </a></li>
	  </ul>
	</div>


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
{Number} The minimun header element to include. eg: "1" will build the TOC starting with <code>&lt;h1&gt;</code> elements while "2" will build the TOC starting with <code>&lt;h2&gt;</code> elements.

#### **max\_depth**
{Number} The max header element to include. eg: "5" will build the TOC stopping at (but including) <code>&lt;h5&gt;</code> elements while "6" will build the TOC stopping at (but including) <code>&lt;h6&gt;</code> elements.

#### **prepend\_toc\_marker**
{Boolean} Prepend TOC markers to the header elements and the TOC list items.

#### **toc\_marker\_suffix**
{String} The string added after the toc marker. eg: If the TOC marker is 1.1.1 and the toc_marker_suffix is "." the final output will be: "1.1.1." If the TOC Marker is 1.2.3 and the number suffix is ")" the final output will be "1.2.3)".

#### **toc\_marker\_seperator**
{String} The string that divides the toc_marker levels. eg: If the TOC marker levels are 1,1 & 1 and the toc_marker_seperator is "." the final output will be: "1.1.1" If the TOC marker levels are 1,1 & 1 and the toc_marker_seperator is "-" the final output will be: "1-1-1".

#### **toc\_marker\_class**
{String} The class to add to the header and TOC list element toc_marker span. eg: <code>&lt;span class="toc-marker"&gt;1.2.3&lt;/span&gt;</code>.

#### **append\_top\_links**
{Boolean} Add top links to each heading element in the TOC. eg: <code>&lt;h1&gt;&lt;span class="toc-marker"&gt;1&lt;/span&gt; Heading 1 &lt;a href="#top"&gt;Top&lt;/a&gt;&lt;/h1&gt;</code>.

#### **top\_link\_class**
{String} The class to add to the top link anchor element. eg: <code>&lt;a href="#top" class="top"&gt;Top&lt;/a&gt;</code>.

#### **append\_toc\_header\_class**
{Boolean} Append an extra class to headers listed in the TOC.

#### **toc\_header\_class**
{String} The class to append to the TOC headers.

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

---

This file is written using the MarkDown syntax. It may or may not have been parsed. If you are having trouble reading it try running the contents through http://daringfireball.net/projects/markdown/dingus.

[Newism Pty Ltd]: http://newism.com.au/
[Creative Commons Attribution-Share Alike 3.0 Unported]: http://creativecommons.org/licenses/by-sa/3.0/ 
[Leevi Graham]: http://leevigraham.com/