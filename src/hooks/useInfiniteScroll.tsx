import { RefObject, useEffect } from "react";

// Handle scroll to load more data
const useInfiniteScroll = (
  containerRef: RefObject<HTMLDivElement | null>,
  loadMore: { (): void; (): void },
  loading: any,
  data: any
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (loading) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [data, loading]);
};

export default useInfiniteScroll;
