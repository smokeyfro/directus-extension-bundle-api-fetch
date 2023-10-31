<template>
  <div class="api-fetch" :class="{ 'has-header': showHeader }">
    <v-input 
      v-model="query" 
      autofocus="true" 
      @keyup.enter="search" 
      placeholder="Type a show name then hit enter...">
    </v-input>
    <div v-if="isLoading">Loading</div>

    <ul v-else-if="filteredResults.length">
      <li 
        v-for="result in filteredResults" 
        :key="result.name" 
        :value="result.name"
        @click="selectItem(result)">
          {{ result.name }}
        </li>
    </ul>
    <div v-if="selectedItem !== null" class="selected">
      <div v-if="selectedItem.thumb" class="thumb"  :title="selectedItem.name" :style="`--background: url(${selectedItem.thumb})`"></div> 
      <div v-else class="thumb empty"></div>
      <div>
        <h3>{{ selectedItem.name }}</h3>
        <p>
          <span v-if="selectedItem.network">{{ selectedItem.network }}</span>
          <span v-if="selectedItem.country"> &middot; {{ selectedItem.country }}</span>
        </p>
        <p v-if="selectedItem.genres" class="genres"><span class="badge" v-for="genre in selectedItem.genres" :key="genre">#{{ genre }}</span></p>
        <p class="action"><v-button class="submit" :small=true @click="saveItem">Save to Directus</v-button></p>
      </div>
    </div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <v-dialog v-model="responseDialog" @esc="responseDialog = false">
      <v-sheet>
        <v-notice type="success" icon="done" v-if="formResponse && formResponse[primaryKeyField.field]">Added {{ formResponse.name }}!
        </v-notice>
        <v-notice type="danger" icon="warning" v-else-if="formError">An error occurred</v-notice>
        <v-notice type="danger" icon="warning" v-else-if="formResponse === null">No response</v-notice>
        <blockquote v-if="formResponse && responseFormat && formResponse[responseFormat]" class="form-response">
          <router-link :to="getLinkForItem(formResponse)">
            <render-template
              collection="shows"
              :template="responseFormat"
              :item="formResponse"
            />
            <v-icon name="launch" small />
          </router-link>
        </blockquote>
        <blockquote v-else-if="formResponse && responseFormat && formResponse[responseFormat] && formError" class="">
          {{ formError }}
        </blockquote>
        <v-button @click="responseDialog = false" fullWidth="true" class="close">Done</v-button>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import { useApi, useCollection, useStores } from '@directus/extensions-sdk';
import { computed, ref, watch } from 'vue';

export default {
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
    })
    
    const selectItem = (item) => {
      selectedItem.value = item;
      query.value = '';
    }

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
</script>

<style scoped>
.api-fetch {
  padding: 20px;
}
.api-fetch.has-header {
  padding: 0 12px;
}
.api-fetch ul {
  margin: 0;
  padding: 15px;
  overflow-y: auto;
  display: inline-block;
  background: #192023;
  width: 100%;
  height: 155px;
  list-style: none;
  border-radius: 4px;
}
.api-fetch li {
  padding: 5px;
  border-radius: 4px;
  background: transparent;
  transition: background ease-in-out .5s;
}
.api-fetch li:hover {
  background: rgba(0,0,0,0.3);
}
.api-fetch .selected {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
}
.api-fetch .thumb {
  background-image: var(--background);
  background-size: 100px;
  display: block;
  width: 100px;
  min-width: 100px;
  height: 140px;
  border-radius: 4px;
}
.selected h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}
.selected .genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.selected .genres span {
  color: rgba(255,255,255,0.6);
  display: inline-block;
}
.selected .action {
  margin-top: 15px;
}
.close {
  margin-top: 15px;
}
</style>