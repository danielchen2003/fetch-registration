import axios from "axios"
const url = "https://frontend-take-home.fetchrewards.com/form"

async function fetchData() {
  try {
    const res = await axios.get(url)

    return res.data
  } catch (error) {
    if (error.response) {
      console.log(error.response)
      console.log("server responded")
    } else if (error.request) {
      console.log("network error")
    } else {
      console.log(error)
    }
  }
}

async function postData(formValue) {
  try {
    const response = await axios.post(url, formValue)

    return response
  } catch (error) {
    if (error.response) {
      console.log(error.response)
      console.log("server responded")
    } else if (error.request) {
      console.log("network error")
    } else {
      console.log(error)
    }
  }
}

export { fetchData, postData }
