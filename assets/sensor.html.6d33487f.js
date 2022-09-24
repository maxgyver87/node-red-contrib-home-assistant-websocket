import{h as a,o as i,c as r,a as e,e as n,F as d,g as t,i as c}from"./app.7a8ebebe.js";import{_ as h}from"./plugin-vue_export-helper.21dcd24c.js";const l={},u={class:"custom-container warning"},p=e("p",{class:"custom-container-title"},"WARNING",-1),b=t("Needs "),_={href:"https://github.com/zachowj/hass-node-red",target:"_blank",rel:"noopener noreferrer"},m=t("Custom Integration"),f=t(" installed in Home Assistant for this node to function"),g=e("h1",{id:"sensor",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#sensor","aria-hidden":"true"},"#"),t(" Sensor")],-1),x=e("p",null,"Creates a sensor in Home Assistant which can be manipulated from this node.",-1),y=e("h2",{id:"configuration",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#configuration","aria-hidden":"true"},"#"),t(" Configuration")],-1),v={id:"state",tabindex:"-1"},T=e("a",{class:"header-anchor",href:"#state","aria-hidden":"true"},"#",-1),k=t(" State "),w=c('<ul><li>Type: <code>string | number | boolean</code></li></ul><p>The state the entity should be updated to</p><h3 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes" aria-hidden="true">#</a> Attributes</h3><ul><li>Type: <code>Object</code></li></ul><p>Key/Value pair of attributes to update. The key should be a string and the value can be a [string | number | boolean | object]</p><h3 id="input-override" tabindex="-1"><a class="header-anchor" href="#input-override" aria-hidden="true">#</a> Input Override</h3><ul><li>Type: <code>string</code></li><li>Values: <code>accept | merge | block</code></li></ul><p>Determine how input values will be handled. When merge is selected the message object values will override the configuration values.</p><h3 id="resend-state-and-attributes" tabindex="-1"><a class="header-anchor" href="#resend-state-and-attributes" aria-hidden="true">#</a> Resend state and attributes</h3><ul><li>Type: <code>boolean</code></li></ul><p>When creating the entity in Home Assistant this will also send the last updated state and attributes then node sent to Home Assistant</p><h2 id="inputs" tabindex="-1"><a class="header-anchor" href="#inputs" aria-hidden="true">#</a> Inputs</h2><p>properties of <code>msg.payload</code></p><h3 id="state-1" tabindex="-1"><a class="header-anchor" href="#state-1" aria-hidden="true">#</a> state</h3><ul><li>Type: <code>string | number | boolean</code></li></ul><p>The state the entity should be updated to</p><h3 id="attributes-1" tabindex="-1"><a class="header-anchor" href="#attributes-1" aria-hidden="true">#</a> attributes</h3><ul><li>Type: <code>Object</code></li></ul><p>Key/Value pair of attributes to update. The key should be a string and the value can be a <code>[string | number | boolean | object]</code></p>',19);function N(V,j){const s=a("ExternalLinkIcon"),o=a("Badge");return i(),r(d,null,[e("div",u,[p,e("p",null,[e("em",null,[b,e("a",_,[m,n(s)]),f])])]),g,x,y,e("h3",v,[T,k,n(o,{text:"required"})]),w],64)}var B=h(l,[["render",N]]);export{B as default};
