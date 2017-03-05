TODO
====

- label which connector of which node


THINK ABOUT
===========

- How to create abstractions/composition of functions?
- Is it a good idea to store output nodes? (since there can be many)
- What data structures/schemes to represent where data originated from


HIGHLIGHTING SOURCES/RESULTS
============================

- for constants, highlight the node itself
- if output not asked to be visible, do not highlight anything?
- a way to expose whole trail of value transformation


REPRESENTATION
==============

- since we need tables, we need HTML, but also need cubic bezier curves
  so need HTML with SVG overlay
  HTML for everything except connections, SVG in background


DEBUGGING
=========

- allow connecting a debugging block
- by default, if nothing is connected to output node, show debugging block to see output
- modifier key + hover over item in debugging block shows all sources, they can all just hover about
- temporary debugging blocks are in a separate element over the rest of the scene, to avoid storing them in state. Normal debug blocks are in scene


EXECUTION
=========

- ONLY execute parts that are affected by any changes. e.g. connecting output of something to something else should not recalculate everything
