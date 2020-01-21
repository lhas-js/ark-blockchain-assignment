import { shallowMount } from "@vue/test-utils";
import Back from "@/components/icons/Back.vue";

describe("Back.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Back);
    expect(wrapper).toMatchSnapshot();
  });
});
