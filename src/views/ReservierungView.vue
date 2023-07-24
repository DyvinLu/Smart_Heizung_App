<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Meine Reservierungen</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/">Dashboard</router-link>
                </li>
                <!-- <li class="breadcrumb-item"><a href="index.html">Raum</a></li> -->
                <li class="breadcrumb-item active">Reservierungen</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <div class="row">
          <!-- Blog Post -->
          <div class="col-md-6 col-xl-4 col-sm-12 d-flex">
            <div class="blog grid-blog flex-fill">
              <div class="blog-content">
                <ul class="entry-meta meta-item">
                  <li>
                    <div class="post-author">
                      <a href="#">
													<span>
														<span class="post-title">Reservierung 1</span>
														<span class="post-date"><i class="far fa-clock"></i>  4 Dec 2022</span>
													</span>
                      </a>
                    </div>
                  </li>
                </ul>
                <h3 class="blog-title"><a href="#">
                  Text.</a></h3>
                <p>...</p>
              </div>
              <div class="row">
                <div class="edit-options">
                  <div class="edit-delete-btn">
                    <a href="edit-blog.html" class="text-success"><i class="feather-edit-3 me-1"></i> Bestätigen</a>
                    <a href="#" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"><i
                      class="feather-trash-2 me-1"></i> Stornieren</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-xl-4 col-sm-12 d-flex">
            <div class="blog grid-blog flex-fill">
              <div class="blog-content">
                <ul class="entry-meta meta-item">
                  <li>
                    <div class="post-author">
                      <a href="#">
													<span>
														<span class="post-title">Reservierung 2</span>
														<span class="post-date"><i class="far fa-clock"></i>  4 Dec 2022</span>
													</span>
                      </a>
                    </div>
                  </li>
                </ul>
                <h3 class="blog-title"><a href="#">
                  Text.</a></h3>
                <p>...</p>
              </div>
              <div class="row">
                <div class="edit-options">
                  <div class="edit-delete-btn">
                    <a href="edit-blog.html" class="text-success"><i class="feather-edit-3 me-1"></i>Bestätigen</a>
                    <a href="#" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"><i
                      class="feather-trash-2 me-1"></i> Stornieren</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-xl-4 col-sm-12 d-flex">
            <div class="blog grid-blog flex-fill">
              <div class="blog-content">
                <ul class="entry-meta meta-item">
                  <li>
                    <div class="post-author">
                      <a href="#">
													<span>
														<span class="post-title">reservierung 3</span>
														<span class="post-date"><i class="far fa-clock"></i>  4 Dec 2022</span>
													</span>
                      </a>
                    </div>
                  </li>
                </ul>
                <h3 class="blog-title"><a href="#">
                  Text.</a></h3>
                <p>...</p>
              </div>
              <div class="row">
                <div class="edit-options">
                  <div class="edit-delete-btn">
                    <a href="edit-blog.html" class="text-success"><i class="feather-edit-3 me-1"></i> Bestätigen</a>
                    <a href="#" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"><i
                      class="feather-trash-2 me-1"></i>Stornieren</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <!-- /Page Wrapper -->
  </div>
</template>

<script setup>
import Header from "../App.vue";
</script>
<style scoped>

</style>