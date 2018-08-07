---
layout: page
title: Videos
permalink: /videos/
---

{% for video in site.data.videos %}

<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/{{video.videoId}}?autoplay=0&origin=http://example.com" frameborder="0"></iframe>

{% endfor %}