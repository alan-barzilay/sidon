#!/bin/bash
sd '(<path)(\s.*)(\s*transform.*)?(\s*.*)(\s*id="[ABCDE].*\s?.*/>)' '$1 tabindex="0" style="display:inline;fill:#000000;fill-opacity:0;image-rendering:auto;stroke:#000000;stroke-opacity:1;stroke-width:1.5;stroke-dasharray:none" $3 $4 $5'  map2.svg

sd '(<path\s*id="[ABCDE].*)(\s*.*)(\s*transform.*)?(\s*.*)(\s.*/>)' '$1 tabindex="0" style="display:inline;fill:#000000;fill-opacity:0;image-rendering:auto;stroke:#000000;stroke-opacity:1;stroke-width:1.5;stroke-dasharray:none" $3 $4 $5'  map2.svg
