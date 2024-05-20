<template>
  <div class="photo-wrap">
    <img class="userImg" ref="img" :src="imgSrc" alt="" />
    <div class="topBar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="finish" @click="onfinish">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { editUserHead } from '@/api/user'
export default {
  props: {
    value: {
      type: String,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cropper:null,
    };
  },
  mounted() {
    //初始化裁剪图片区域
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      //视图模式：0没有限制，1裁剪框不超过画布大小，
      //2限制最小画布大小适应容器，3限制最小画布大小以填充适合容器
      viewMode: 1,
      //拖动模式：crop创建一个新的裁剪框 move移动画布 none什么都不做
      dragMode: "move",
      //定义作物框的初始宽高比。默认情况下，它与画布（图像包装）的宽高比相同。
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
  methods:{
    onfinish(){
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto(blob){
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: "加载中...",
      });
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const res = await editUserHead(formData);
        // 关闭弹层
        this.$emit("close");
        //更新数据
        this.$emit("input", res.data.data.photo);
        console.log(res);
        this.$toast.success("更新头像成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新头像失败");
      }
    }
  },
};
</script>
  
  <style scoped lang="less">
.photo-wrap {
  height: 100vh;
  width: 100vw;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  .topBar {
    position: fixed;
    left: 15px;
    right: 15px;
    top: 20px;
    display: flex;
    justify-content: space-between;
    .cancel,
    .finish {
      font-size: 18px;
      color: #fff;
    }
  }
  .uerImg {
    display: block;
    max-width: 100%;
  }
}
</style>