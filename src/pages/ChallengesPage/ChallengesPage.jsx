import { useState } from "react";
import imagePlaceholder from "../../assets/placeholders/imagePlaceholder.webp";
import styles from "./ChallengesPage.module.css";
import CurrentChallengeSection from "../../components/sections/challenges/CurrentChallengeSection/CurrentChallengeSection";
import ChallengeSubmissionForm from "../../components/sections/challenges/ChallengeSubmissionForm/ChallengeSubmissionForm";
import ChallengeSubmissionsSection from "../../components/sections/challenges/ChallengeSubmissionsSection/ChallengeSubmissionsSection";
import PastChallengesSection from "../../components/sections/challenges/PastChallengesSection/PastChallengesSection";
import { currentChallenge, pastChallenges } from "../../data/challenges";
import initialChallengeSubmissions from "../../data/challengeSubmissions";

const ChallengesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submissions, setSubmissions] = useState(initialChallengeSubmissions);
  const [imagePreview, setImagePreview] = useState("");
  const currentChallengeSubmissions = submissions.filter(
    (submission) => submission.challengeId === currentChallenge.id,
  );

  const resetFormState = () => {
    setImagePreview("");
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    resetFormState();
  };

  const handleFormSubmit = (formValues) => {
    const trimmedArtworkTitle = formValues.artworkTitle.trim();
    const trimmedArtistName = formValues.artistName.trim();
    const trimmedMedium = formValues.medium.trim();
    const trimmedNote = formValues.note.trim();

    setSubmissions((prevSubmissions) => {
      const nextId =
        prevSubmissions.length > 0
          ? Math.max(...prevSubmissions.map((submission) => submission.id)) + 1
          : 1;

      const newSubmission = {
        id: nextId,
        challengeId: currentChallenge.id,
        artistName: trimmedArtistName,
        artworkTitle: trimmedArtworkTitle,
        image: imagePreview || imagePlaceholder,
        medium: trimmedMedium,
        submittedAt: new Date().toISOString().split("T")[0],
        note: trimmedNote,
      };

      return [newSubmission, ...prevSubmissions];
    });

    resetFormState();
    setIsFormOpen(false);
  };

  return (
    <div className={styles.page}>
      <CurrentChallengeSection
        title={currentChallenge.title}
        theme={currentChallenge.theme}
        brief={currentChallenge.brief}
        deadline={currentChallenge.deadline}
        status={currentChallenge.status}
        allowedMedia={currentChallenge.allowedMedia}
        prize={currentChallenge.prize}
        coverImage={currentChallenge.coverImage}
        onParticipate={handleOpenForm}
      />
      {isFormOpen && (
        <ChallengeSubmissionForm
          previewImage={imagePreview}
          onPreviewChange={setImagePreview}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
      <ChallengeSubmissionsSection submissions={currentChallengeSubmissions} />
      <PastChallengesSection challenges={pastChallenges} />
    </div>
  );
};

export default ChallengesPage;
