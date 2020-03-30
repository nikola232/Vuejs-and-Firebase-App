<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message" calss="left">New Message (enter to add):</label>
      <input type="text" name="new-message" v-model="newMessage" />
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";

export default {
  name: "AddComment",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      feedback: null,
      user: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        db.collection("messages")
          .add({
            to: this.$route.params.id,
            from: this.user,
            content: this.newMessage,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    }
  },
  created() {
    let ref = db.collection("users");

    // get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.user = doc.data()), (this.user.id = doc.id);
        });
      });

    // geting alias from users database
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change == "added") {
          let doc = change.doc;
          this.alias = doc.data().alias;
          console.log(this.alias);
        }
      });
    });
  }
};
</script>

<style></style>
