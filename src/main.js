import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";

const app = createApp(App);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faCompress } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

import Logo from "./components/Logo.vue";
import MainContainer from "./components/layouts/MainContainer.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseInput from "./components/UI/BaseInput.vue";
import BaseRadio from "./components/UI/BaseRadio.vue";
import BaseLabel from "./components/UI/BaseLabel.vue";
import BaseDropdown from "./components/UI/BaseDropdown.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";
import TheHeader from '@/components/layouts/TheHeader.vue'

library.add(
  faUserCircle,
  faUsers,
  faUserFriends,
  faGraduationCap,
  faArchive,
  faChartPie,
  faAward,
  faSignOutAlt,
  faBook,
  faVideo,
  faClipboardList,
  faSyncAlt,
  faTimesCircle,
  faCheckCircle,
  faExclamationCircle,
  faClock,
  faVolumeUp,
  faVolumeMute,
  faPlay,
  faExpand,
  faPause,
  faCompress,
  faBackward,
  faHistory
);

app.component("lottie-animation", LottieAnimation);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("logo", Logo);
app.component("main-container", MainContainer);
app.component("base-button", BaseButton);
app.component("base-input", BaseInput);
app.component("base-radio", BaseRadio);
app.component("base-label", BaseLabel);
app.component("base-dropdown", BaseDropdown);
app.component("base-spinner", BaseSpinner);
app.component("the-header", TheHeader);

app.use(router);
app.use(store);

app.mount("#app");
