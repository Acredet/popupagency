<template>
  <div class="wrapper">
    <section class="vh-100 d-flex justify-content-center align-items-center banner center-image position-relative">
      <div class="banner-overlay" />
      <h1 class="text-white banner-text" v-text="'Kontakta oss'" />
    </section>

    <b-container>
      <section class="text-secondary py-5" aria-label="popup idea">
        <h2 class="header font-10 font-md-18 text-dark font-weight-bolder" v-text="'Från idé till popup'" />
        <p>Vi finns alltid ett mail eller samtal ifrån dig och vi svarar så fort som möjligt. </p>
        <p>Fyll i formuläret nedan och skicka in redan idag eller slå någon utav oss en signal. Vi har en oförglömlig popup att planera tillsammans. </p>
        <b>Kontorets öppettider:</b>
        <p>Måndag – fredag 09:00 – 17:00</p>
        <p>Vill du kontakta någon specifik medarbetare? Scrolla vidare så finner du allas kontaktuppgifter.</p>
      </section>
    </b-container>

    <div class="bg-dark py-3">
      <b-container>
        <h2 class="font-10 font-md-18 text-white font-weight-bolder" v-text="'Medarbetare'" />
      </b-container>
    </div>

    <b-container class="py-5">
      <b-row>
        <!-- Start office detail -->
        <b-col cols="12" md="6" class="d-flex flex-column justify-content-center align-items-start">
          <h3 class="header p-0 m-0 font-10 font-md-18 font-weight-bolder" v-text="'East Office'" />
          <small class="font-weight-bolder">STOCKHOLM, SÖDERMALM, SÖDERHALLARNA</small>
        </b-col>
        <!-- End office detail -->

        <!-- Start Map -->
        <b-col cols="12" md="6">
          <gmap-map style="width: 100%; height: 300px" :center="map.center" :map-type-id="map.mapTypeId" :zoom="12">
            <gmap-cluster>
              <gmap-marker v-for="(mark, index) in map.markers" :key="index" :icon="require(`@/assets/img/marker.svg`)" :position="mark" />
            </gmap-cluster>
          </gmap-map>
        </b-col>
        <!-- End Map -->

        <!-- Start cards -->
        <b-col cols="12">
          <b-row>
            <b-col cols="12" md="4">
              <div class="agent">
                <div class="st-background" style="background-image: url('https://www.popupagency.se/wp-content/uploads/2019/09/Skärmavbild-2019-09-19-kl.-21.59.36.png');" />
                <div class="img-hover-holder gradient7">
                  <div class="info-hover">
                    <ul class="list-unstyled">
                      <li><small class="text-white">Rikard Lundberg</small></li>
                      <li><small class="text-white">CEO &amp; Founder</small></li>
                    </ul>
                  </div>

                  <ul class="list-unstyled social-nav">
                    <li class="fb-icon">
                      <a href="tel:%20+46762514000" target="_blank">
                        <i class="fas fa-phone" />
                      </a>
                    </li>
                    <li class="fb-icon">
                      <a href="mailto:rikard@popupagency.se" target="_blank">
                        <i class="fas fa-envelope" />
                      </a>
                    </li>
                    <li class="fb-icon">
                      <a href="https://www.linkedin.com/in/triggerinsight/" target="_blank">
                        <i class="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="details text-center">
                <b>CEO & FOUNDER</b>
                <h3>Rikard Lundberg</h3>
                <a href="mailto:rikard@popupagency.se">rikard@popupagency.se</a>
                <p>+46 76 251 40 00</p>
                <p class="text-center">
                  <i class="fas fa-phone" />
                  <i class="fas fa-envelope" />
                  <i class="fab fa-linkedin-in" />
                </p>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <!-- End cards -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      map: {
        center: { lat: 59.315092, lng: 18.080587 },
        mapTypeId: 'roadmap',
        markers: [{ lat: 59.315092, lng: 18.080587 }]
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  background: #f4f4f4
}

.header {
  letter-spacing: -3px;
  text-shadow: 0px 0px 10px rgba(0,0,0,0.3);
}

.banner {
  background-image: url('~assets/img/notepad.jpg');
}

.banner .banner-overlay {
  filter: brightness( 100% ) contrast( 100% ) saturate( 100% ) blur( 0px ) hue-rotate( 0deg );
  background-color: rgba(94,37,130,0.43);
  opacity: 0.69;
  transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.banner .banner-text {
  z-index: 999;
  font-weight: bolder;
}

.agent {
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
}

.agent:hover .img-hover-holder {
  opacity: .9;
}

.agent .st-background {
  height: 350px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}

.agent .img-hover-holder {
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  opacity: 0;
  -webkit-transition: opacity .3s ease;
  transition: opacity .3s ease;
}
.gradient7 {
  color: #c644fc;
  background: -webkit-linear-gradient(180deg,#c644fc,#5856d6);
}

.agent .info-hover {
  position: absolute;
  top: 30px;
  left: 30px;
  margin: 0;
  margin-right: -50%;
  max-width: calc(100% - 80px);
}

.agent .social-nav {
  position: absolute;
  top: auto;
  bottom: 20px;
  left: 30px;
  margin: 0;
  right: auto;
  width: auto;
}
.single-team .social-nav li {
  min-width: 0;
}
.social-nav>li, .social-nav>li:last-child {
  margin-right: 0!important;
}
.social-nav li {
  float: left;
  color: #565662;
  position: relative;
  margin-bottom: 10px;
  font-size: 13px;
}

.social-nav li a {
  color: #fff;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-decoration: none;
}

.social-nav li a:hover, .social-nav li a:focus {
  color: #6c4d92;
}

.social-nav li a:hover i, .social-nav li a:focus {
  color: #6c4d92;
  background: #fff!important;
  border-color: #fff!important;
}

.social-nav li a i {
  color: #fff;
  border: 1px solid #fff;
  float: left;
  height: 35px;
  width: 35px;
  font-size: 14px;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  color: #fff;
  border: 1px solid white;
  background: 0 0;
  -webkit-transition: .25s ease;
  transition: .25s ease;
  text-align: center;
  line-height: 35px;
}

.agent .social-nav li a:hover {
  color: white;
  text-decoration: none;
}

.social-nav>li, .social-nav>li:last-child {
  margin-right: 0!important;
}

</style>
