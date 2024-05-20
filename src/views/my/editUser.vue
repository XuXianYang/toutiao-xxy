<template>
  <div class="edit-user">
    <van-nav-bar class="nav-bar" title="个人信息">
      <template #left>
        <i @click="$router.back()" class="iconfont icon-youjiantou"></i>
      </template>
    </van-nav-bar>

    <van-cell-group>
      <input type="file" ref="headInput" hidden @change="fileChange" />
      <van-cell title="头像" @click="selectFile" is-link>
        <template>
          <van-image width="25" height="25" round :src="userInfo.photo" />
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        @click="showNickNamePop = true"
        :value="userInfo.name"
        is-link
      />
      <van-cell
        title="介绍"
        @click="showIntroPop = true"
        :value="userInfo.intro"
        is-link
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell
        title="性别"
        :value="userInfo.gender === 0 ? '男' : '女'"
        is-link
        @click="showGenderPop = true"
      />
      <van-cell
        title="生日"
        :value="userInfo.birthday ? userInfo.birthday : '-'"
        is-link
        @click="showBirthdayPop = true"
      />
    </van-cell-group>

    <!-- 修改头像弹框 -->
    <van-popup v-model="showPhotoPop" style="height: 100%" position="bottom">
      <editPhoto
        v-if="showPhotoPop"
        v-model="userInfo.photo"
        @close="showPhotoPop = false"
        :imgSrc="selectPhoto"
      ></editPhoto>
    </van-popup>
    <!-- 修改昵称弹框 -->
    <van-popup v-model="showNickNamePop" position="bottom" round>
      <editNickName
        v-if="showNickNamePop"
        v-model="userInfo.name"
        @close="showNickNamePop = false"
      ></editNickName>
    </van-popup>
    <!-- 修改介绍弹框 -->
    <van-popup v-model="showIntroPop" position="bottom" round>
      <editIntro
        v-if="showIntroPop"
        v-model="userInfo.intro"
        @close="showIntroPop = false"
      ></editIntro>
    </van-popup>
    <!-- 修改性别弹框 -->
    <van-popup v-model="showGenderPop" position="bottom" round>
      <editGender
        v-if="showGenderPop"
        v-model="userInfo.gender"
        @close="showGenderPop = false"
      ></editGender>
    </van-popup>
    <!-- 修改生日弹框 -->
    <van-popup v-model="showBirthdayPop" position="bottom" round>
      <editBirthday
        v-if="showBirthdayPop"
        v-model="userInfo.birthday"
        @close="showBirthdayPop = false"
      ></editBirthday>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import editBirthday from "./editBirthday.vue";
import editIntro from "./editIntro.vue";
import editGender from "./editGender.vue";
import editNickName from "./editNickName.vue";
import editPhoto from "./editPhoto.vue";
export default {
  data() {
    return {
      //通过路由跳转把用户信息传递过来
      //userInfo:this.$route.params,
      userInfo: {},
      showNickNamePop: false,
      showIntroPop: false,
      showGenderPop: false,
      showPhotoPop: false,
      showBirthdayPop: false,
      selectPhoto: "",
    };
  },
  components: {
    editBirthday,
    editIntro,
    editGender,
    editNickName,
    editPhoto,
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        const res = await getUserProfile();
        this.userInfo = res.data.data;
        console.log(this.userInfo);
        this.$toast.success("获取用户信息成功");
      } catch (err) {
        this.$toast.fail("获取用户信息失败");
      }
    },
    // 选择文件
    selectFile() {
      const fileInput = this.$refs.headInput;
      fileInput.click();
    },
    fileChange() {
      const file = this.$refs.headInput.files[0];
      const data = window.URL.createObjectURL(file);
      this.selectPhoto = data;
      this.showPhotoPop = true;
    },
  },
};
</script>

<style scoped lang="less">
.edit-user {
  .nav-bar {
    .icon-youjiantou {
      color: #fff;
      font-size: 30px;
    }
  }
  .van-cell-group {
    margin-bottom: 10px;
    .van-cell {
      height: 45px;
    }
  }
}
</style>