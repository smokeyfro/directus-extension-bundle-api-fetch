import { useStores, useApi, useCollection } from '@directus/extensions-sdk';
import { computed, ref, watch, resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withKeys, Fragment, renderList, toDisplayString, createCommentVNode, normalizeStyle, createElementVNode, withCtx, createTextVNode, createBlock } from 'vue';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.api-fetch[data-v-a9ecf425] {\n  padding: 20px;\n}\n.api-fetch.has-header[data-v-a9ecf425] {\n  padding: 0 12px;\n}\n.api-fetch ul[data-v-a9ecf425] {\n  margin: 0;\n  padding: 15px;\n  overflow-y: auto;\n  display: inline-block;\n  background: #192023;\n  width: 100%;\n  height: 155px;\n  list-style: none;\n  border-radius: 4px;\n}\n.api-fetch li[data-v-a9ecf425] {\n  padding: 5px;\n  border-radius: 4px;\n  background: transparent;\n  transition: background ease-in-out .5s;\n}\n.api-fetch li[data-v-a9ecf425]:hover {\n  background: rgba(0,0,0,0.3);\n}\n.api-fetch .selected[data-v-a9ecf425] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  margin-top: 15px;\n}\n.api-fetch .thumb[data-v-a9ecf425] {\n  background-image: var(--background);\n  background-size: 100px;\n  display: block;\n  width: 100px;\n  min-width: 100px;\n  height: 140px;\n  border-radius: 4px;\n}\n.selected h3[data-v-a9ecf425] {\n    font-size: 20px;\n    font-weight: bold;\n    margin-bottom: 5px;\n}\n.selected .genres[data-v-a9ecf425] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.selected .genres span[data-v-a9ecf425] {\n  color: rgba(255,255,255,0.6);\n  display: inline-block;\n}\n.selected .action[data-v-a9ecf425] {\n  margin-top: 15px;\n}\n.close[data-v-a9ecf425] {\n  margin-top: 15px;\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
  props: {
    showHeader: {
      type: Boolean,
      default: false,
    },
    collection: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
    },
    responseFormat: {
      type: String,
      default: '',
    },
    width: String,
    height: String,
  },
  setup(props) {
		const { usePermissionsStore } = useStores();
		const permissionsStore = usePermissionsStore();
    const hasPermission = computed(() => permissionsStore.has(props.collection, 'create'));
    const api = useApi();
    const isLoading = ref(false);
    const { primaryKeyField } = useCollection(props.collection);
    const query = ref('');
    const searchResults = ref([]);
    let selectedItem = ref(null);
    const formResponse = ref({});
    const formError = ref({});
    const responseDialog = ref(false);

    async function search() {
      isLoading.value = true;
      const response = await api.get(`/api-fetch?q=${query.value}`);
      searchResults.value = response.data;
      isLoading.value = false;
   }

    const filteredResults = computed(() => {
      if (query.value) {
        return searchResults.value.filter((item) => {
          return item.name && item.language.includes('English');
        });
      }

      return [];
    });
    
    const selectItem = (item) => {
      selectedItem.value = item;
      query.value = '';
    };

    function saveItem() {
      api
        .post(`/items/${props.collection}`, selectedItem.value)
        .then((response) => {
          formResponse.value = response.data.data;
          responseDialog.value = true;
          selectedItem.value = null;
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            formError.value = "Bad request. Please check your data.";
          } else if (error.response && error.response.status === 500) {
            formError.value = "Internal server error. Please try again later.";
          } else {
            console.error("Error while saving the item:", error);
            formError.value = "An error occurred while saving the item. Please try again later.";
          }
          responseDialog.value = true;
        });
    }

    watch([() => props.collection], search);

    return { 
      hasPermission,
      isLoading,
      primaryKeyField,
      query, 
      searchResults, 
      filteredResults, 
      selectedItem, 
      formResponse,
      formError,
      responseDialog,
      getLinkForItem,
      search, 
      selectItem, 
      saveItem,
    }
    function getLinkForItem(item) {
			if (item === undefined) return;
      //console.log(item);
			const primaryKey = item[primaryKeyField.value.field];
			return `/content/${props.collection}/${encodeURIComponent(primaryKey)}`;
		}
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = ["value", "onClick"];
const _hoisted_4 = {
  key: 2,
  class: "selected"
};
const _hoisted_5 = ["title"];
const _hoisted_6 = {
  key: 1,
  class: "thumb empty"
};
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = {
  key: 0,
  class: "genres"
};
const _hoisted_10 = { class: "action" };
const _hoisted_11 = { key: 3 };
const _hoisted_12 = {
  key: 3,
  class: "form-response"
};
const _hoisted_13 = {
  key: 4,
  class: ""
};

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_input = resolveComponent("v-input");
  const _component_v_button = resolveComponent("v-button");
  const _component_v_notice = resolveComponent("v-notice");
  const _component_render_template = resolveComponent("render-template");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_router_link = resolveComponent("router-link");
  const _component_v_sheet = resolveComponent("v-sheet");
  const _component_v_dialog = resolveComponent("v-dialog");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["api-fetch", { 'has-header': $props.showHeader }])
  }, [
    createVNode(_component_v_input, {
      modelValue: $setup.query,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.query) = $event)),
      autofocus: "true",
      onKeyup: withKeys($setup.search, ["enter"]),
      placeholder: "Type a show name then hit enter..."
    }, null, 8 /* PROPS */, ["modelValue", "onKeyup"]),
    ($setup.isLoading)
      ? (openBlock(), createElementBlock("div", _hoisted_1, "Loading"))
      : ($setup.filteredResults.length)
        ? (openBlock(), createElementBlock("ul", _hoisted_2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.filteredResults, (result) => {
              return (openBlock(), createElementBlock("li", {
                key: result.name,
                value: result.name,
                onClick: $event => ($setup.selectItem(result))
              }, toDisplayString(result.name), 9 /* TEXT, PROPS */, _hoisted_3))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : createCommentVNode("v-if", true),
    ($setup.selectedItem !== null)
      ? (openBlock(), createElementBlock("div", _hoisted_4, [
          ($setup.selectedItem.thumb)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "thumb",
                title: $setup.selectedItem.name,
                style: normalizeStyle(`--background: url(${$setup.selectedItem.thumb})`)
              }, null, 12 /* STYLE, PROPS */, _hoisted_5))
            : (openBlock(), createElementBlock("div", _hoisted_6)),
          createElementVNode("div", null, [
            createElementVNode("h3", null, toDisplayString($setup.selectedItem.name), 1 /* TEXT */),
            createElementVNode("p", null, [
              ($setup.selectedItem.network)
                ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString($setup.selectedItem.network), 1 /* TEXT */))
                : createCommentVNode("v-if", true),
              ($setup.selectedItem.country)
                ? (openBlock(), createElementBlock("span", _hoisted_8, " · " + toDisplayString($setup.selectedItem.country), 1 /* TEXT */))
                : createCommentVNode("v-if", true)
            ]),
            ($setup.selectedItem.genres)
              ? (openBlock(), createElementBlock("p", _hoisted_9, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.selectedItem.genres, (genre) => {
                    return (openBlock(), createElementBlock("span", {
                      class: "badge",
                      key: genre
                    }, "#" + toDisplayString(genre), 1 /* TEXT */))
                  }), 128 /* KEYED_FRAGMENT */))
                ]))
              : createCommentVNode("v-if", true),
            createElementVNode("p", _hoisted_10, [
              createVNode(_component_v_button, {
                class: "submit",
                small: true,
                onClick: $setup.saveItem
              }, {
                default: withCtx(() => [
                  createTextVNode("Save to Directus")
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick"])
            ])
          ])
        ]))
      : (_ctx.error)
        ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createElementVNode("p", null, "Error: " + toDisplayString(_ctx.error), 1 /* TEXT */)
          ]))
        : createCommentVNode("v-if", true),
    createVNode(_component_v_dialog, {
      modelValue: $setup.responseDialog,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($setup.responseDialog) = $event)),
      onEsc: _cache[3] || (_cache[3] = $event => ($setup.responseDialog = false))
    }, {
      default: withCtx(() => [
        createVNode(_component_v_sheet, null, {
          default: withCtx(() => [
            ($setup.formResponse && $setup.formResponse[$setup.primaryKeyField.field])
              ? (openBlock(), createBlock(_component_v_notice, {
                  key: 0,
                  type: "success",
                  icon: "done"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Added " + toDisplayString($setup.formResponse.name) + "! ", 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }))
              : ($setup.formError)
                ? (openBlock(), createBlock(_component_v_notice, {
                    key: 1,
                    type: "danger",
                    icon: "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("An error occurred")
                    ]),
                    _: 1 /* STABLE */
                  }))
                : ($setup.formResponse === null)
                  ? (openBlock(), createBlock(_component_v_notice, {
                      key: 2,
                      type: "danger",
                      icon: "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("No response")
                      ]),
                      _: 1 /* STABLE */
                    }))
                  : createCommentVNode("v-if", true),
            ($setup.formResponse && $props.responseFormat && $setup.formResponse[$props.responseFormat])
              ? (openBlock(), createElementBlock("blockquote", _hoisted_12, [
                  createVNode(_component_router_link, {
                    to: $setup.getLinkForItem($setup.formResponse)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_render_template, {
                        collection: "shows",
                        template: $props.responseFormat,
                        item: $setup.formResponse
                      }, null, 8 /* PROPS */, ["template", "item"]),
                      createVNode(_component_v_icon, {
                        name: "launch",
                        small: ""
                      })
                    ]),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["to"])
                ]))
              : ($setup.formResponse && $props.responseFormat && $setup.formResponse[$props.responseFormat] && $setup.formError)
                ? (openBlock(), createElementBlock("blockquote", _hoisted_13, toDisplayString($setup.formError), 1 /* TEXT */))
                : createCommentVNode("v-if", true),
            createVNode(_component_v_button, {
              onClick: _cache[1] || (_cache[1] = $event => ($setup.responseDialog = false)),
              fullWidth: "true",
              class: "close"
            }, {
              default: withCtx(() => [
                createTextVNode("Done")
              ]),
              _: 1 /* STABLE */
            })
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue"])
  ], 2 /* CLASS */))
}
var PanelComponent = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-a9ecf425"],['__file',"panel.vue"]]);

var Preview = `<svg width="156" height="96" viewBox="0 0 156 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1280_294)">
    <g>
        <rect x="18" y="33" width="120" height="30" rx="6" fill="var(--card-face-color)" class="glow"></rect>
        <rect x="19" y="34" width="118" height="28" rx="5" stroke="var(--theme--primary)" stroke-width="2"></rect>
    </g>
    <path d="M124.503 49.5033H123.977L123.79 49.3233C124.443 48.5633 124.837 47.5766 124.837 46.5033C124.837 44.1099 122.897 42.1699 120.503 42.1699C118.11 42.1699 116.17 44.1099 116.17 46.5033C116.17 48.8966 118.11 50.8366 120.503 50.8366C121.577 50.8366 122.563 50.4433 123.323 49.7899L123.503 49.9766V50.5033L126.837 53.8299L127.83 52.8366L124.503 49.5033ZM120.503 49.5033C118.843 49.5033 117.503 48.1633 117.503 46.5033C117.503 44.8433 118.843 43.5033 120.503 43.5033C122.163 43.5033 123.503 44.8433 123.503 46.5033C123.503 48.1633 122.163 49.5033 120.503 49.5033Z" fill="var(--theme--primary)"></path>
    <rect x="26" y="46" width="35" height="4" rx="1" fill="var(--theme--primary-subdued)"></rect>
</g>
<defs>
    <clipPath id="clip0_1280_294">
        <rect width="156" height="96" fill="var(--background-page)" class="glow"></rect>
    </clipPath>
</defs>
</svg>`;

var e0 = {
	id: 'api-fetch-panel',
	name: 'API Fetch',
	icon: 'subscriptions',
	preview: Preview,
	description: 'Search for an item then click the button to add it to your collection',
	component: PanelComponent,
	options: [
		{
			field: 'collection',
			type: 'string',
			name: '$t:collection',
			meta: {
				interface: 'system-collection',
				options: {
					includeSystem: false,
					includeSingleton: false,
				},
				width: 'half',
			},
		},
		{
			field: 'responseFormat',
			name: 'Response',
			type: 'string',
			meta: {
				interface: 'system-display-template',
				options: {
					collectionField: 'collection',
					placeholder: '{{ field }}',
				},
				width: 'half',
			},
		},
	],
	minWidth: 20,
	minHeight: 15,
	skipUndefinedKeys: ['responseFormat'],
};

const interfaces = [];const displays = [];const layouts = [];const modules = [];const panels = [e0];const operations = [];

export { displays, interfaces, layouts, modules, operations, panels };
