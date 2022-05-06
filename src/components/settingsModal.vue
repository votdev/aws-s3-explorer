<template>
  <div>
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="cognitoLogin()">
          <div>
            <div class="modal-header">
              <h4 class="modal-title">S3 Explorer: Settings</h4>
            </div>
            <div class="modal-body">
              <div class="col-md-18">
                <h2>Welcome to the S3GW Explorer</h2>
                <div class="" style="width: 100%;">
                  <div>
                    To log in specify the following configuration:
                  </div>
                  <br>
                  <div style="display: flex; align-items: center">
                    <ul class="flex-outer">
                      <li>
                        <span style="flex-grow: 1; flex-shrink: 0; margin-right: 0.5rem">endpoint:&nbsp;</span><br>
                        <input name="endpoint" v-model.trim="store.endpoint"
                          type="text" class="form-control" required="true" style="flex-grow: 1; margin-right: 0.5rem">
                      </li>
                      <li>
                        <span style="flex-grow: 1; flex-shrink: 0; margin-right: 0.5rem">accessKeyId:&nbsp;</span><br>
                        <input name="accessKeyId" v-model.trim="store.accessKeyId"
                          type="text" class="form-control" required="true" style="flex-grow: 1; margin-right: 0.5rem">
                      </li>
                      <li>
                        <span style="flex-grow: 1; flex-shrink: 0; margin-right: 0.5rem">secretAccessKey:&nbsp;</span><br>
                        <input name="secretAccessKey" v-model.trim="store.secretAccessKey"
                          type="text" class="form-control" required="true" style="flex-grow: 1; margin-right: 0.5rem">
                      </li>
                      <li>
                        <span style="flex-grow: 1; flex-shrink: 0; margin-right: 0.5rem">bucketName:&nbsp;</span><br>
                        <input name="bucketName" v-model.trim="store.bucketName"
                          type="text" class="form-control" required="true" style="flex-grow: 1; margin-right: 0.5rem">
                      </li>
                    </ul>
                    <button style="flex-grow: 1; margin-right: 0.5rem" type="submit" class="btn btn-primary" :disabled="!store.accessKeyId"><i class="fas fa-sign-in-alt" /> Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { copyText } from 'vue3-clipboard';

import store from '../store';
import { login, setConfiguration } from '../awsUtilities';

const state = reactive({ region: null, copyButtonSuccess: false });

const suggestedRegion = 'eu-west-1';

const generatedCognitoPoolUrl = computed(() => `https://${store.region}.console.aws.amazon.com/cognito/v2/idp/user-pools/${store.cognitoPoolId}`);
const launchStackUrl = computed(() => {
  return `https://${suggestedRegion}.console.aws.amazon.com/lambda/home?region=${suggestedRegion}#/create/app?applicationId=arn:aws:serverlessrepo:eu-west-1:922723803004:applications/S3-Explorer`;
});

const cognitoLogin = async () => {
  //await setConfiguration(store.awsAccountId);
  await login(true);
};

const copyCognitoPoolCallbackUrl = () => {
  copyText(`https://${store.awsAccountId}-s3explorer.auth.${store.region || suggestedRegion}.amazoncognito.com/oauth2/idpresponse`, undefined, () => {
    state.copyButtonSuccess = true;
    setConfiguration(store.awsAccountId);
  });
};
</script>
