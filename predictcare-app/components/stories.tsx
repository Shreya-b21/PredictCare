import type { User } from "firebase/auth"
import Navigation from "@/components/navigation"

interface StoriesProps {
  navigateTo: (page: string) => void
  user: User | null
}

export default function Stories({ navigateTo, user }: StoriesProps) {
  return (
    <div>
      <Navigation navigateTo={navigateTo} currentPage="stories-page" user={user} />
      <div className="p-8 text-white">
        <h1 className="text-3xl mb-4">Success Stories</h1>
        <p>This page contains inspiring stories from survivors and patients.</p>

        <div className="mt-6">
          <h2 className="text-2xl mb-2">Annie Miyazaki-Grant</h2>
          <img
            src="https://www.foxchase.org/sites/default/files/styles/patient_story_alt_teaser/public/2024-04/IMG_1570.jpg?itok=BHXXj_zs"
            alt="Annie Miyazaki-Grant"
            className="my-4 max-w-full md:max-w-md rounded-lg"
          />
          <p className="mt-2">
            In March 2022, my sister discovered a lump in her breast completely by accident. I consider myself pretty on
            top of these things, but I decided to do an impromptu self-exam and I also found a lump. From there, both of
            us went through mammograms, biopsies, and countless appointments before being diagnosed with breast cancer
            within a week of each other. It was surreal.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl mb-2">Sandra Race</h2>
          <img
            src="https://www.foxchase.org/sites/default/files/styles/patient_story_alt_teaser/public/2024-04/kl.JPG?itok=lC0_mdFu"
            alt="Sandra Race"
            className="my-4 max-w-full md:max-w-md rounded-lg"
          />
          <p className="mt-2">
            I've always been a healthy, active person. I don't take any medications, I eat the best I can, and I walk at
            least two miles every day. I also get my routine mammogram every year.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl mb-2">Rose Boyd-Young</h2>
          <img
            src="https://www.foxchase.org/sites/default/files/styles/patient_story_alt_teaser/public/2024-04/Resized_20161210_180242_001_7511_1548032972466.jpeg_copy.jpeg?itok=5D4V1epy"
            alt="Rose Boyd-Young"
            className="my-4 max-w-full md:max-w-md rounded-lg"
          />
          <p className="mt-2">
            Like a lot of people in 2020, my mammogram was postponed due to the pandemic. When I finally had it done in
            2021, I got a letter a few weeks later telling me I needed more scans. I went back in, and after they took
            some more scans, the radiologist told me I also needed an ultrasound. By then I was thinking, "This is
            really weird, I've never had to do this before."
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl mb-2">Jo Ann Bono</h2>
          <img
            src="https://www.foxchase.org/sites/default/files/styles/patient_story_alt_teaser/public/2024-03/Screenshot%202024-03-06%20112324.jpg?itok=irrpesCf"
            alt="Jo Ann Bono"
            className="my-4 max-w-full md:max-w-md rounded-lg"
          />
          <p className="mt-2">
            Breast, Liver, Gall Bladder & Bile Duct Cancer. When COVID-19 hit, I decided it was time to retire from a
            lifetime of teaching art and do more traveling with my partner Joe. We purchased a tiny trailer and spent a
            year and a half visiting family and scenic vistas. Our travels were put on hold, however, when I was
            diagnosed with not one but two cancers.
          </p>
        </div>
      </div>
    </div>
  )
}
