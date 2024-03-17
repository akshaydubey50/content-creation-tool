import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DOMAIN_URL } from "@/helper/helper";

export default function AuthForm() {
  const supabase = createClientComponentClient<any>();

  return (
    <>
      <div className="">
        <Auth
          supabaseClient={supabase}
          view="magic_link"
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          showLinks={false}
          providers={[]}
          redirectTo={DOMAIN_URL() + "/auth/callback"}
        />
      </div>
    </>
  );
}
