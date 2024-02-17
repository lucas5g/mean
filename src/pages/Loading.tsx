import { Loader2 } from "lucide-react";
import { Layout } from "../components/Layout";

export function Loading() {
  return (
    <Layout>
      <main className="h-[76vh] flex justify-center items-center">
        <Loader2  
          size={70}
          className="animate-spin"
          />
      </main>
    </Layout>
  )
}