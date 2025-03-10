import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createTestQueryClient = () => {
  return new QueryClient({
      defaultOptions: {
          queries: {
              staleTime: 0,
              retry: false,
          },
      },
  });
};

export const QueryClientTestWrapper = ({ children }: { children: React.ReactNode }) => {
  
  const testQueryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};