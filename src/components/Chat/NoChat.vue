<template>
  <div class="no__chat_selected" id="el">
    <img
      class="no__chat_selcted_img"
      src="@/assets/images/intro-connection-light.jpg"
      alt=""
    />
    <div class="no__chat_selected_text">
      <h2>Keep your phone connected</h2>
      <span>
        Whatsapp connects to your phone to sync messages. To reduce data usage,
        connect your phone to Wi-Fi.
      </span>
    </div>
  </div>
</template>

<style scoped>
.no__chat_selected {
  flex: 0.65;
  margin: auto;
  text-align: center;
}

.no__chat_selected_text {
  text-align: center;
  margin-top: 10px;
}

.no__chat_selected_text > h2 {
  font-weight: 200 !important;
  font-size: 28px !important;
  color: #525252 !important;
  margin-bottom: 10px;
}

.no__chat_selected_text > span {
  color: #00000073;
}

.no__chat_selcted_img {
  width: 40%;
  border-radius: 50%;
}
</style>