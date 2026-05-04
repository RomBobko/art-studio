import { useState } from "react";
import styles from "./DashboardPage.module.css";
import currentUser from "../../data/currentUser";
import artists from "../../data/artists";
import artworks from "../../data/artworks";
import DashboardHeader from "./components/DashboardHeader";
import DashboardUploadForm from "./components/DashboardUploadForm";
import DashboardStats from "./components/DashboardStats";
import DashboardArtworkList from "./components/DashboardArtworkList";
import DashboardProfileForm from "./components/DashboardProfileForm";

const formatPrice = (value) => `$${new Intl.NumberFormat("en-US").format(value)}`;

const DashboardPage = () => {
  const dashboardArtist = artists.find(
    (artist) => artist.id === currentUser.artistId,
  );
  const dashboardArtworks = artworks.filter(
    (artwork) => artwork.artistId === currentUser.artistId,
  );
  const dashboardArtistName = dashboardArtist?.name || currentUser.displayName;
  const [draftArtworks, setDraftArtworks] = useState([]);
  const recentArtworks = [...dashboardArtworks]
    .sort(
      (firstArtwork, secondArtwork) =>
        secondArtwork.year - firstArtwork.year ||
        secondArtwork.price - firstArtwork.price,
    )
    .slice(0, 3);
  const listedArtworksCount = dashboardArtworks.length;
  const draftArtworksCount = draftArtworks.length;
  const trendingArtworksCount = dashboardArtworks.filter(
    (artwork) => artwork.isTrending,
  ).length;
  const totalPortfolioValue = dashboardArtworks.reduce(
    (sum, artwork) => sum + artwork.price,
    0,
  );

  const handleDraftCreate = (newDraftArtwork) => {
    setDraftArtworks((prevDraftArtworks) => [
      newDraftArtwork,
      ...prevDraftArtworks,
    ]);
  };

  return (
    <div className={styles.page}>
      <section
        className={styles.dashboardSection}
        aria-labelledby="dashboard-page-title"
      >
        <div className="container-narrow">
          <DashboardHeader artistName={dashboardArtistName} />

          <div className={styles.dashboardCard}>
            <div className={styles.layout}>
              <DashboardUploadForm
                listedArtworksCount={listedArtworksCount}
                draftArtworksCount={draftArtworksCount}
                onDraftCreate={handleDraftCreate}
              />

              <div className={styles.insightsColumn}>
                <DashboardStats
                  listedArtworksCount={listedArtworksCount}
                  draftArtworksCount={draftArtworksCount}
                  trendingArtworksCount={trendingArtworksCount}
                  totalPortfolioValue={totalPortfolioValue}
                  formatPrice={formatPrice}
                />

                <DashboardArtworkList
                  draftArtworks={draftArtworks}
                  recentArtworks={recentArtworks}
                  formatPrice={formatPrice}
                />
              </div>

              <DashboardProfileForm
                currentUser={currentUser}
                dashboardArtist={dashboardArtist}
                dashboardArtistName={dashboardArtistName}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
