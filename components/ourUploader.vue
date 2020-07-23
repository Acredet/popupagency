<template>
  <div>
    <b-row v-if="thereIsImage">
      <b-col>
        <b-btn variant="warning" @click="thereIsImage = false">
          Edit Avatar
        </b-btn>
        <slot name="old-Image" />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col
        v-for="input in inputs"
        :key="input"
        :cols="responsivness.cols"
        :sm="responsivness.sm"
        :md="responsivness.md"
        :lg="responsivness.lg"
      >
        <div
          :data-id="`${name}-${input}`"
          class="input-group--wrapper"
          @click="wrapperClicked"
          @drop="dropped"
          @dragenter="dragIn"
          @dragleave="dragOut"
          @dragover="allowDrop"
        >
          <button type="button" :data-id="`${name}-${input}`" class="close" aria-label="Close" @click="delBtnClicked">
            <span aria-hidden="true">&times;</span>
          </button>

          <input
            :id="name"
            :name="name"
            type="file"
            accept="image/*"
            :data-id="`${name}-${input}`"
            @change="inputChanged"
          >

          <img :data-id="`${name}-${input}`">
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',
  props: {
    maxFileSize: {
      type: Number,
      default: () => 64
    },
    name: {
      type: String,
      default: () => 'input'
    },
    responsivness: {
      type: Object,
      default: () => {
        return {
          cols: 6,
          sm: 6,
          md: 4,
          lg: 3
        }
      }
    },
    maxNumberOfInputs: {
      type: Number,
      default: () => 6
    },
    oldImages: {
      type: Array,
      default: () => []
    }
  },
  data: (vm) => {
    return {
      inputs: 1,
      files: 0,
      oldInputValue: null,
      thereIsImage: vm.oldImages ? vm.oldImages.length > 0 : false
    }
  },
  updated () {
    console.log('Working')
  },
  methods: {
    dropped (event) {
      event.preventDefault()
      event.target.classList.remove('drag')

      const vm = this
      const inputs = document.querySelectorAll('.input-group--wrapper input')
      const delBtns = document.querySelectorAll(
        '.input-group--wrapper button.close'
      )
      const images = document.querySelectorAll('.input-group--wrapper img')

      const wrapper = event.target
      console.log(wrapper)
      const input = [...inputs].find(
        x => x.getAttribute('data-id') === wrapper.getAttribute('data-id')
      )
      const oldVal = input.value
      input.files = event.dataTransfer.files
      if (input.files[0].size / 1024 / 1024 <= vm.maxFileSize) {
        vm.AddImage(input, delBtns, images, oldVal === '')
      } else {
        alert(`Max size is ${vm.maxFileSize} MB`)
      }
    },
    allowDrop (event) {
      event.preventDefault()
      event.target.classList.add('drag')
    },
    dragIn (event) {
      event.preventDefault()
      event.target.classList.add('drag')
    },
    dragOut (event) {
      event.preventDefault()
      event.target.classList.remove('drag')
    },
    deleteImage (btn, inputs, images) {
      const input = [...inputs].find(
        i => i.getAttribute('data-id') === btn.getAttribute('data-id')
      )
      const img = [...images].find(
        i => i.getAttribute('data-id') === btn.getAttribute('data-id')
      )
      input.value = ''

      img.removeAttribute('src')
      img.style.display = 'none'
      btn.style.display = 'none'
      this.files--
    },
    AddImage (input, delBtns, images, newOne) {
      // Add Preview Image
      const vm = this
      const imageSrc = URL.createObjectURL(input.files[0])
      const exactImg = [...images].find(
        img => img.getAttribute('data-id') === input.getAttribute('data-id')
      )
      const exactDelBtn = [...delBtns].find(
        btn => btn.getAttribute('data-id') === input.getAttribute('data-id')
      )

      exactDelBtn.style.display = 'block'
      exactImg.style.display = 'block'
      exactImg.setAttribute('src', imageSrc)
      if (newOne) { vm.files++ }
      if (vm.files >= vm.inputs && vm.input < vm.maxNumberOfInputs) {
        vm.inputs++
      }
    },
    wrapperClicked (e) {
      const inputs = document.querySelectorAll('.input-group--wrapper input')
      const id = e.target.getAttribute('data-id')
      const input = [...inputs].find(i => i.getAttribute('data-id') === id)
      this.oldInputValue = input.value
      input.click()
    },
    inputChanged (e) {
      const input = e.target
      const delBtns = document.querySelectorAll(
        '.input-group--wrapper button.close'
      )
      const images = document.querySelectorAll('.input-group--wrapper img')
      // Handle File Here

      if (input.files[0].size / 1024 / 1024 <= this.maxFileSize) {
        this.AddImage(input, delBtns, images, this.oldInputValue === '')
      } else {
        alert(`Max size is ${this.maxFileSize} MB`)
      }
    },
    delBtnClicked (e) {
      e.stopPropagation()
      const images = document.querySelectorAll('.input-group--wrapper img')
      const inputs = document.querySelectorAll('.input-group--wrapper input')

      this.deleteImage(e.target.parentElement, inputs, images)
    }
  }
}
</script>

<style lang="sass">
.input-group--wrapper
  cursor: pointer
  width: 100%
  height: 150px
  position: relative
  overflow: hidden
  margin-bottom: 10px
  background: white
  transition: all 0.4s ease
  &:hover, &.drag
    background: #eee
  &::before
    font-family: "Font Awesome 5 Free"
    font-weight: 900
    content: "\f093"
    transition: all 0.4s ease
    border: 2px dashed #ddd
    display: flex
    justify-content: center
    align-items: center
    color: #aaa
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  button.close
    position: absolute
    top: 0
    right: 10px
    display: none
    z-index: 4
    color: white

  input
    appearance: none
    display: none

  img
    position: absolute
    display: none
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 2
</style>
