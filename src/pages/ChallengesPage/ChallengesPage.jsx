import { useState } from "react";
import imagePlaceholder from "../../assets/placeholders/imagePlaceholder.webp";
import styles from "./ChallengesPage.module.css";
import CurrentChallengeSection from "../../components/sections/challenges/CurrentChallengeSection/CurrentChallengeSection";
import ChallengeSubmissionForm from "../../components/sections/challenges/ChallengeSubmissionForm/ChallengeSubmissionForm";
import ChallengeSubmissionsSection from "../../components/sections/challenges/ChallengeSubmissionsSection/ChallengeSubmissionsSection";
import PastChallengesSection from "../../components/sections/challenges/PastChallengesSection/PastChallengesSection";
import { currentChallenge, pastChallenges } from "../../data/challenges";
import initialChallengeSubmissions from "../../data/challengeSubmissions";

const INITIAL_FORM_VALUES = {
  artworkTitle: "",
  artistName: "",
  medium: "",
  note: "",
  imageFileName: "",
};

const validateFormValues = (values) => {
  const errors = {};

  if (!values.artworkTitle.trim()) {
    errors.artworkTitle = "Please enter your artwork title.";
  }

  if (!values.artistName.trim()) {
    errors.artistName = "Please enter your name.";
  }

  if (!values.medium.trim()) {
    errors.medium = "Please enter the medium used for your artwork.";
  }

  return errors;
};

const ChallengesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submissions, setSubmissions] = useState(initialChallengeSubmissions);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const currentChallengeSubmissions = submissions.filter(
    (submission) => submission.challengeId === currentChallenge.id,
  );

  const resetFormState = () => {
    setFormValues(INITIAL_FORM_VALUES);
    setFormErrors({});
    setImagePreview("");
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    resetFormState();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      imageFileName: selectedFile ? selectedFile.name : "",
    }));

    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(typeof reader.result === "string" ? reader.result : "");
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateFormValues(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

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
          values={formValues}
          errors={formErrors}
          previewImage={imagePreview}
          onChange={handleFormChange}
          onFileChange={handleFileChange}
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
