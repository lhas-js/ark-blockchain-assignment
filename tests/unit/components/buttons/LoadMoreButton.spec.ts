import { shallowMount } from "@vue/test-utils";
import LoadMoreButton from "@/components/buttons/LoadMoreButton.vue";

describe("LoadMoreButton.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(LoadMoreButton, {
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper).toMatchSnapshot();
  });
});
