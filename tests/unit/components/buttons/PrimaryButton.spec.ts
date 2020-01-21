import { shallowMount } from "@vue/test-utils";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";

describe("PrimaryButton.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(PrimaryButton, {
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper).toMatchSnapshot();
  });
});
