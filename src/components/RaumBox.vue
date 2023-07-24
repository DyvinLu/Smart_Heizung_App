<template>
  <div class="blog grid-blog flex-fill">
    <div class="blog-content">
      <ul class="entry-meta meta-item">
        <li>
          <div class="post-author">
            <router-link :to="`/details/${roomNumber.replace('.', '')}`">
                        <span>
                          <span class="post-title">{{roomNumber}}</span>
                          <span class="post-date"><i class="far fa-clock"></i> {{current_temp}} ℃</span>
                        </span>
            </router-link>
          </div>
        </li>
      </ul>
      <h3 class="blog-title">
        <router-link  :to="`/details/${roomNumber.replace('.', '')}`">{{type}} - [<b>Ziel T.</b> - {{target_temp}} ℃]</router-link>
      </h3>
      <p>{{desc}}</p>
    </div>
    <div class="row">
      <div class="edit-options">
        <div class= "edit-delete-btn">
          <router-link :to="`/details/${roomNumber.replace('.', '')}`" class="text-success"  ><i class="feather-edit-3 me-1"></i> auswählen</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  roomNumber: String,
  current_temp: String,
  target_temp: String,
  desc: String,
  type: String
})
</script>
