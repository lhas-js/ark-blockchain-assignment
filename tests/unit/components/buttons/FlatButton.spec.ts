import { shallowMount } from "@vue/test-utils";
import FlatButton from "@/components/buttons/FlatButton.vue";

describe("FlatButton.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(FlatButton, {
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper).toMatchSnapshot();
  });
});
