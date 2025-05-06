import type { User } from "firebase/auth"
import Navigation from "@/components/navigation"

interface SelfExamProps {
  navigateTo: (page: string) => void
  user: User | null
}

export default function SelfExam({ navigateTo, user }: SelfExamProps) {
  return (
    <div>
      <Navigation navigateTo={navigateTo} currentPage="self-exam-page" user={user} />
      <div className="p-8 text-white">
        <h1 className="text-3xl mb-4">Self-Examination Guide</h1>

        <h2 className="text-2xl mb-2">How you prepare</h2>
        <p>To prepare for your breast self-exam for breast awareness:</p>

        <h3 className="text-xl mt-4 mb-2">Ask a healthcare professional to show you how to do the exam</h3>
        <p>
          Before you begin breast self-exams for breast awareness, you may find it helpful to discuss the instructions
          and technique with your healthcare professional.
        </p>

        <h3 className="text-xl mt-4 mb-2">If you menstruate, do the exam after your period</h3>
        <p>
          Hormone levels fluctuate each month during the menstrual cycle. This causes changes in breast tissue, such as
          swelling, and may cause breast tenderness. Breast swelling begins to decrease at the start of a period. The
          best time to perform a self-exam for breast awareness is usually the week after your period ends.
        </p>

        <h2 className="text-2xl mt-6 mb-2">What you can expect</h2>

        <h3 className="text-xl mt-4 mb-2">Begin by looking at your breasts</h3>
        <p>
          Sit or stand shirtless and braless in front of a mirror with your arms at your sides. To inspect your breasts
          visually, do the following:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Face forward and look for puckering, dimpling, or changes in size, shape or symmetry.</li>
          <li>Check to see if your nipples are turned in.</li>
          <li>Inspect your breasts with your hands pressed down on your hips.</li>
          <li>Inspect your breasts with your arms raised overhead and the palms of your hands pressed together.</li>
          <li>Lift your breasts to see if ridges along the bottom are symmetrical.</li>
        </ul>
        <p className="mt-2 italic">
          *If you have a vision condition that makes it difficult for you to visually inspect your breasts, ask a
          trusted friend or a family member to help you.
        </p>

        <h3 className="text-xl mt-4 mb-2">Next, use your hands to examine your breasts</h3>
        <img
          src="https://surgeonrengan.com/wp-content/uploads/2020/06/Breast-Self-Examination.png"
          alt="Breast self-examination technique"
          className="my-4 max-w-full md:max-w-md"
        />

        <p>Common ways to perform the manual part of the breast exam include:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Lying down:</strong> Choose a bed or other flat surface to lie down on your back. When you're lying
            down, breast tissue spreads out. This makes the tissue thinner and easier to feel.
          </li>
          <li>
            <strong>In the shower:</strong> Lather your fingers and breasts with soap to help your fingers glide more
            smoothly over your skin.
          </li>
        </ul>

        <p className="mt-4">When examining your breasts, some general tips to keep in mind include:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Use the pads of your fingers:</strong> Use the pads, not the very tips, of your three middle fingers
            for the exam. If you have difficulty feeling with your finger pads, use another part of your hand that is
            more sensitive. This may include your palm or the backs of your fingers.
          </li>
          <li>
            <strong>Use different pressure levels:</strong> Your goal is to feel different depths of the breast by using
            different levels of pressure to feel all the breast tissue. Use light pressure to feel the tissue closest to
            the skin, medium pressure to feel a little deeper, and firm pressure to feel the tissue closest to the chest
            and ribs. Be sure to use each pressure level before moving on to the next spot. If you're not sure how hard
            to press, talk with your healthcare professional.
          </li>
          <li>
            <strong>Take your time:</strong> Don't rush. It may take several minutes to carefully examine your breasts.
          </li>
          <li>
            <strong>Follow a pattern:</strong> Use a methodical technique to ensure you examine your entire breast. For
            instance, imagine the face of a clock or the slices of a pie over your breast. Begin near your collarbone
            and examine that section, moving your fingers from the outside edge of the breast toward your nipple. Then
            move your fingers to the next section.
          </li>
        </ul>

        <h2 className="text-2xl mt-6 mb-2">Results</h2>

        <h3 className="text-xl mt-4 mb-2">What's typical</h3>
        <p>
          Finding a change in your breast isn't a reason to panic. Some breast changes are typical. For instance, if you
          have periods, you might notice that your breasts change at certain times in the menstrual cycle. It's common
          for the breasts to feel different in different places. A firm ridge along the bottom of each breast is
          typical, for instance. The look and feel of your breasts will likely change as you age.
        </p>

        <h3 className="text-xl mt-4 mb-2">When to contact a healthcare professional</h3>
        <p>Make an appointment with a doctor or other healthcare professional if you notice:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>A hard lump or knot near your underarm.</li>
          <li>A recent change in a nipple to being pushed in instead of sticking out.</li>
          <li>Bloody nipple discharge.</li>
          <li>Changes in skin color, warmth, swelling or pain.</li>
          <li>
            Changes in the way your breasts look or feel, including thickening or noticeable fullness that is different
            from the surrounding tissue.
          </li>
          <li>Dimples, puckers, bulges or ridges on the skin of your breast.</li>
          <li>Itching, scales, sores or rashes.</li>
        </ul>
        <p className="mt-2">
          Your healthcare professional may suggest more tests and procedures to investigate breast changes. Tests and
          procedures may include a clinical breast exam, a mammogram and an ultrasound.
        </p>
      </div>
    </div>
  )
}
