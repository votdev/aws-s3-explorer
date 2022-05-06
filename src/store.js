import { reactive, watch, computed } from 'vue';

const storedData = JSON.parse(localStorage.getItem('s3console') || '{}');

const store = reactive(Object.assign({
  region: 'us-east-1',

  delimiter: null,
  currentBucket: null,
  rememberedBuckets: [],
  currentDirectory: null,

  awsAccountId: null,
  cognitoPoolId: null,
  applicationClientId: null,
  applicationLoginUrl: null,
  identityPoolId: null,
  userRoleId: null,

  endpoint: 'http://s3gw-no-tls.local:30080',
  accessKeyId: '0555b35654ad1656d804',
  secretAccessKey: 'h7GhxuBLTrlhVUyxSPUKUV8r/2EI4ngqJxD7iBdBYLhwluN30JaT3Q==',
  bucketName: null,
  tokens: 'it-must-contains-something',

  objects: [],

  loggedOut: false,
  autoLoginIn: true,
  sharedSettings: {}
}, storedData, {
  initialized: true,
  globalLoader: true,
  loggedOut: false,
  showBucketSelector: true,
  showSettings: false,
  showAddFolder: false,
  showTrash: false,
  showUploads: false,
  deletedObjects: {}
}));

watch(store, () => {
  localStorage.setItem('s3console', JSON.stringify(store));
  AWS.config.update({ region: store.region });
});

const currentBucket = computed(() => store.currentBucket);
watch(currentBucket, () => {
  store.deletedObjects = {};
});

export default store;

export function getBuckets() {
  return store.rememberedBuckets.concat(store.sharedSettings?.buckets || [])
  .map(bucket => {
    if (typeof bucket === 'object') {
      return bucket;
    }

    return { bucket };
  }).sort((a, b) => a.bucket.localeCompare(b.bucket));
}

export const s3StorageClasses = {
  STANDARD: 'Standard',
  STANDARD_IA: 'Standard IA',
  ONEZONE_IA: 'One Zone-IA',
  REDUCED_REDUNDANCY: 'Reduced Redundancy',
  GLACIER: 'Glacier',
  INTELLIGENT_TIERING: 'Intelligent Tiering',
  DEEP_ARCHIVE: 'Deep Archive'
};
