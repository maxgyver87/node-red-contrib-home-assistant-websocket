import{h as s,o as d,c as r,a as e,e as o,F as l,g as t,i as n}from"./app.7a8ebebe.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const h={},u=e("h1",{id:"events-state",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#events-state","aria-hidden":"true"},"#"),t(" Events: state")],-1),p=e("p",null,"Outputs state_changed event types sent from Home Assistant",-1),_=e("p",null,"The autocomplete will open to allow easier selection in the case you want a specific entity however the actual match is a substring match so no validation is done",-1),f=e("h2",{id:"configuration",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#configuration","aria-hidden":"true"},"#"),t(" Configuration:")],-1),g={id:"entity-id",tabindex:"-1"},y=e("a",{class:"header-anchor",href:"#entity-id","aria-hidden":"true"},"#",-1),b=t(" Entity ID "),m=e("ul",null,[e("li",null,[t("Type: "),e("code",null,"string|regex")])],-1),x=e("p",null,"matches for entity_id field",-1),v=e("p",null,[t("Custom ids can be inserted into the list by adding a "),e("code",null,"#"),t(" at the end of the id")],-1),w={id:"entity-id-filter-types",tabindex:"-1"},T=e("a",{class:"header-anchor",href:"#entity-id-filter-types","aria-hidden":"true"},"#",-1),I=t(" Entity ID Filter Types "),A=n('<ul><li>Type: <code>string</code></li><li>Values: <code>exact|substring|regex</code></li><li>Default: <code>exact</code></li></ul><p>Substring can be a comma-delimited list.</p><h3 id="if-state" tabindex="-1"><a class="header-anchor" href="#if-state" aria-hidden="true">#</a> If State</h3><ul><li>Type: <code>string</code></li></ul><p>If the conditional is evaluated as true send the message to the first output otherwise send it to the second output. If blank there will only be one output.</p><p><strong>Also see:</strong></p>',6),C={href:"/guide/conditionals.md",target:"_blank",rel:"noopener noreferrer"},E=t("Conditionals"),k=n('<h3 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> For</h3><ul><li>Type: <code>number</code></li></ul><p>An amount of time an entity&#39;s state needs to be in that state before triggering.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>Output on Connect state changes will not start a timer.</p></div><h3 id="state-type" tabindex="-1"><a class="header-anchor" href="#state-type" aria-hidden="true">#</a> State Type</h3><ul><li>Type: <code>string</code></li><li>Values: <code>string|number|boolean</code></li><li>Default: <code>string</code></li></ul><p>Convert the state of the entity to the selected type. Boolean will be converted to true based on if the string is equal by default to (<code>y|yes|true|on|home|open</code>). Original value stored in msg.data.original_state</p><h3 id="ignore-state-change-event" tabindex="-1"><a class="header-anchor" href="#ignore-state-change-event" aria-hidden="true">#</a> Ignore state change event</h3><ul><li>Type: <code>boolean</code></li></ul><p>A list of possible states that will be ignored.</p><h3 id="output-on-connect" tabindex="-1"><a class="header-anchor" href="#output-on-connect" aria-hidden="true">#</a> Output on Connect</h3><ul><li>Type: <code>boolean</code></li></ul><p>Output once on startup/deploy</p><h3 id="expose-to-home-assistant" tabindex="-1"><a class="header-anchor" href="#expose-to-home-assistant" aria-hidden="true">#</a> Expose to Home Assistant</h3><ul><li>Type: <code>boolean</code></li></ul>',15),N=t("Creates a switch within Home Assistant to enable/disable this node. This feature requires "),V={href:"https://github.com/zachowj/hass-node-red",target:"_blank",rel:"noopener noreferrer"},B=t("Node-RED custom integration"),O=t(" to be installed in Home Assistant"),D=n('<h2 id="outputs" tabindex="-1"><a class="header-anchor" href="#outputs" aria-hidden="true">#</a> Outputs</h2><p>Value types:</p><ul><li><code>event data</code>: full event object</li><li><code>entity id</code>: entity id of the triggered entity</li><li><code>entity state</code>: entity state of the triggered entity</li><li><code>config</code>: config properties of the node</li></ul>',3);function S(q,F){const i=s("Badge"),a=s("ExternalLinkIcon");return d(),r(l,null,[u,p,_,f,e("h3",g,[y,b,o(i,{text:"required"})]),m,x,v,e("h3",w,[T,I,o(i,{text:"required"})]),A,e("ul",null,[e("li",null,[e("a",C,[E,o(a)])])]),k,e("p",null,[N,e("a",V,[B,o(a)]),O]),D],64)}var L=c(h,[["render",S]]);export{L as default};
