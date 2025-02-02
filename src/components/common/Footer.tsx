import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-12 mx-auto max-w-screen-2xl  ">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Main Links */}
          <div className="col-span-2 lg:col-span-2">
            <h2 className="text-lg font-semibold">Content Creation FYI</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your ultimate directory for content creation tools, prompts, and resources.
            </p>
          </div>

          {/* Directory */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Directory</h3>
            <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground">
              Content Tools
            </Link>
            <Link href="/prompts" className="text-sm text-muted-foreground hover:text-foreground">
              Content Prompts
            </Link>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
              Content Projects
            </Link>
            <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground">
              Content Resources
            </Link>
            <Link href="/job-board" className="text-sm text-muted-foreground hover:text-foreground">
              Content Job Board
            </Link>
            <Link href="/experts" className="text-sm text-muted-foreground hover:text-foreground">
              Content Experts
            </Link>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Submit</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Submit Tools
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Submit Prompts
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Submit Expert Profile
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Submit Jobs
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Submit Projects
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Submit Resources
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Contact</h3>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About Us
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>

          {/* Other Projects */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Other Projects</h3>
            <Link href="https://coldoutreach.fyi" className="text-sm text-muted-foreground hover:text-foreground">
              ColdOutreach.fyi
            </Link>
            <Link href="https://growthmarketing.fyi" className="text-sm text-muted-foreground hover:text-foreground">
              GrowthMarketing.fyi
            </Link>
            <Link href="https://careersfyi.com" className="text-sm text-muted-foreground hover:text-foreground">
              CareersFYI.com
            </Link>
            <Link href="https://mactools.fyi" className="text-sm text-muted-foreground hover:text-foreground">
              MacTools.fyi
            </Link>
          </div>
        </div>

        {/* Bottom Section with Legal */}
        <div className="mt-12 border-t pt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Content Creation FYI. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Twitter
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  LinkedIn
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  GitHub
                </Link>
              </div>
            </div>
            <div className="flex gap-8 md:justify-end">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

