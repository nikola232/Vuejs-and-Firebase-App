<template>
  <!-- <div class="chat container">
    <h2 class="center teal-text">Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.from }}</span>
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div> -->
  <div class="view-profile container" vue-chat-scroll>
    <div class="card">
      <ul
        v-for="message in messages"
        :key="message.id"
        class="comments collection"
      >
        <li>
          <span class="teal-text">{{ message.from.alias }}</span>
          <span class="grey-text text-darken-3">{{ message.content }}</span>
          <span class="grey-text time">{{ message.timestamp }}</span>
        </li>
      </ul>
      <AddComment :name="name" />
    </div>
  </div>
</template>

<script>
import AddComment from "./AddComment";
import db from "../../firebase/init";
import moment from "moment";

export default {
  name: "UserWall",
  props: ["name"],
  components: {
    AddComment
  },

  data() {
    return {
      messages: []
    };
  },

  created() {
    let ref = db
      .collection("messages")
      .where("to", "==", this.$route.params.id);

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            from: doc.data().from,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format("lll")
          });
        }
      });
    });
  }
};
</script>

<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}

.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}

.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
}
</style>
