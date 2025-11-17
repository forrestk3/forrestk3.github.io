(function(){"use strict";function t(){const e=document.getElementById("clock-time"),t=document.getElementById("clock-date"),n=document.getElementById("clock-weekday");if(!e||!t||!n)return;const o=["日","一","二","三","四","五","六"];function s(){const s=new Date,i=String(s.getHours()).padStart(2,"0"),a=String(s.getMinutes()).padStart(2,"0"),r=String(s.getSeconds()).padStart(2,"0");e.textContent=`${i}:${a}:${r}`;const c=s.getFullYear(),l=String(s.getMonth()+1).padStart(2,"0"),d=String(s.getDate()).padStart(2,"0");t.textContent=`${c}年${l}月${d}日`;const u=o[s.getDay()];n.textContent=`星期${u}`}s(),setInterval(s,1e3)}function n(){const e=document.getElementById("weather-container"),n=document.querySelector(".home-sidebar");if(!e)return;const t={city:n?.dataset.weatherCity||"Beijing",apiKey:n?.dataset.weatherApiKey||"",apiUrl:n?.dataset.weatherApiUrl||"https://api.openweathermap.org/data/2.5/weather"};if(!t.apiKey){e.innerHTML=`
                <div class="weather-content">
                    <div class="weather-desc">请在 config.toml 中配置天气 API</div>
                    <div class="weather-details">
                        <div class="weather-detail-item">
                            <span>推荐使用：</span>
                            <span>OpenWeatherMap</span>
                        </div>
                    </div>
                </div>
            `;return}async function s(){try{e.innerHTML='<div class="weather-loading">加载中...</div>';const s=`${t.apiUrl}?q=${t.city}&appid=${t.apiKey}&units=metric&lang=zh_cn`,n=await fetch(s);if(!n.ok)throw new Error("天气数据获取失败");const i=await n.json();o(i)}catch(t){console.error("天气获取错误:",t),e.innerHTML=`
                    <div class="weather-content">
                        <div class="weather-desc">天气数据获取失败</div>
                        <div class="weather-details">
                            <div class="weather-detail-item">
                                <span>错误：</span>
                                <span>${t.message}</span>
                            </div>
                        </div>
                    </div>
                `}}function o(t){const n=i(t.weather[0].main),s=Math.round(t.main.temp),o=t.weather[0].description,a=t.main.humidity,r=t.wind?.speed||0;e.innerHTML=`
                <div class="weather-content">
                    <div class="weather-main">
                        <div class="weather-temp">${s}°C</div>
                        <div class="weather-icon">${n}</div>
                    </div>
                    <div class="weather-desc">${o}</div>
                    <div class="weather-details">
                        <div class="weather-detail-item">
                            <span>湿度：</span>
                            <span>${a}%</span>
                        </div>
                        <div class="weather-detail-item">
                            <span>风速：</span>
                            <span>${r} m/s</span>
                        </div>
                    </div>
                </div>
            `}function i(e){const t={Clear:"☀️",Clouds:"☁️",Rain:"🌧️",Drizzle:"🌦️",Thunderstorm:"⛈️",Snow:"❄️",Mist:"🌫️",Fog:"🌫️"};return t[e]||"🌤️"}s(),setInterval(s,30*60*1e3)}function s(){const m=document.querySelector(".music-widget");let t=[];if(m&&m.dataset.musicList)try{t=JSON.parse(m.dataset.musicList)}catch(e){console.error("音乐列表解析失败:",e)}(!t||t.length===0)&&(t=[]);const e=new Audio;let o=0,s=!1;const r=document.getElementById("music-title"),i=document.getElementById("music-artist"),a=document.getElementById("music-play-pause"),j=document.getElementById("music-prev"),b=document.getElementById("music-next"),h=document.getElementById("music-progress-bar"),g=document.getElementById("music-progress-fill"),f=document.getElementById("music-current-time"),l=document.getElementById("music-duration"),d=document.getElementById("music-volume"),p=document.getElementById("music-volume-value");if(!e||!a)return;function c(n){if(n<0||n>=t.length)return;o=n;const s=t[n];e.src=s.url,r&&(r.textContent=s.title),i&&(i.textContent=s.artist||"未知艺术家"),e.load(),_()}function _(){const e=document.querySelectorAll(".playlist-item");e.forEach((e,t)=>{t===o?e.classList.add("active"):e.classList.remove("active")})}function w(){s?(e.pause(),a.textContent="▶",s=!1):(e.play().catch(e=>{console.error("播放失败:",e),alert("音乐播放失败，请检查音乐 URL 是否正确")}),a.textContent="⏸",s=!0)}function O(){const n=o-1<0?t.length-1:o-1;c(n),s&&e.play()}function v(){const n=(o+1)%t.length;c(n),s&&e.play()}function x(){if(e.duration){const t=e.currentTime/e.duration*100;g&&(g.style.width=t+"%"),f&&(f.textContent=u(e.currentTime)),l&&(l.textContent=u(e.duration))}}function u(e){if(isNaN(e))return"0:00";const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${String(n).padStart(2,"0")}`}a.addEventListener("click",w),j&&j.addEventListener("click",O),b&&b.addEventListener("click",v),h&&h.addEventListener("click",t=>{const n=h.getBoundingClientRect(),s=(t.clientX-n.left)/n.width;e.currentTime=s*e.duration}),d&&(d.addEventListener("input",t=>{const n=t.target.value/100;e.volume=n,p&&(p.textContent=t.target.value+"%")}),e.volume=d.value/100),e.addEventListener("timeupdate",x),e.addEventListener("ended",v),e.addEventListener("loadedmetadata",()=>{l&&(l.textContent=u(e.duration))});const n=document.getElementById("playlist-toggle"),y=document.getElementById("playlist-content"),C=document.querySelectorAll(".playlist-item");if(n&&y){let e=!1;n.addEventListener("click",t=>{t.stopPropagation(),e=!e,y.classList.toggle("collapsed",e),n.classList.toggle("collapsed",e),n.textContent=e?"▶":"▼"});const t=n.closest(".playlist-header");t&&t.addEventListener("click",e=>{e.target!==n&&n.click()})}C.forEach((t,n)=>{t.addEventListener("click",()=>{c(n),s&&e.play()})}),t.length>0?c(0):(r&&(r.textContent="暂无音乐"),i&&(i.textContent="请将 MP3 文件放入 static/mp3 文件夹"))}function e(){document.querySelector(".page.home")&&(t(),n(),s())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()