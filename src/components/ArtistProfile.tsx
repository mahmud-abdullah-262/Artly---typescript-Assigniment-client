import { Card, Table, Button, Skeleton } from "@heroui/react";
import { Palette, ImageOff, Trash2, MapPin, Images } from "lucide-react";
import { useServerFetch } from "../../lib/action/core/useServerFetch";
import { useCurrentSession } from "../../lib/action/useCurrentSession";
import { useProtectedFetch } from "../../lib/action/core/useProtectedFetch";
import type { Artist } from "../../lib/types/Artist";
import type { ArtworkProduct } from "../../lib/types/ArtWorksProduct";


const BIO_WORD_LIMIT = 100;

const truncateBio = (bio?: string) => {
  if (!bio) return "";
  const words = bio.trim().split(/\s+/);
  if (words.length <= BIO_WORD_LIMIT) return bio;
  return `${words.slice(0, BIO_WORD_LIMIT).join(" ")}…`;
};

const ArtistProfile = () => {
  const { user, isPending: isSessionPending } = useCurrentSession();

  const { data: artistProfile, loading: isProfilePending } =
    useServerFetch<Artist>(`/api/artist/${user?.id}`);

 const { data: artistTable, loading: isTablePending } = useProtectedFetch<ArtworkProduct[]>(`/api/artworkbyartist/${artistProfile?.artistId}`);
  console.log(artistTable, 'artist table')
  const isLoadingProfile = isSessionPending || isProfilePending;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile header */}
      <Card className="mb-8 border border-border bg-bg-card">
        <Card.Content className="p-0">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
            {isLoadingProfile ? (
              <Skeleton className="h-28 w-28 shrink-0 rounded-full" />
            ) : (
              <img
                src={artistProfile?.image}
                alt={artistProfile?.name}
                className="h-28 w-28 shrink-0 rounded-full border border-border object-cover"
              />
            )}

            <div className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">
                <Palette size={13} className="text-primary" />
                Artist
              </span>

              {isLoadingProfile ? (
                <Skeleton className="mt-2 h-8 w-56 rounded-sm" />
              ) : (
                <h1 className="mt-1 font-serif text-2xl font-bold text-text-dark sm:text-3xl">
                  {artistProfile?.name}
                </h1>
              )}

              {artistProfile?.location && (
                <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
                  <MapPin size={14} />
                  {artistProfile.location}
                </p>
              )}

              {isLoadingProfile ? (
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>
              ) : (
                artistProfile?.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-text-dark/80 sm:text-base">
                    {truncateBio(artistProfile.bio)}
                  </p>
                )
              )}
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Artworks table */}
      <Card className="border border-border bg-bg-card">
        <Card.Header className="flex flex-row items-center justify-between gap-3 border-b border-border px-6 py-5">
          <div>
            <Card.Title className="font-serif text-xl font-bold text-text-dark">
              My Artworks
            </Card.Title>
            <Card.Description className="text-sm text-text-muted">
              Manage the pieces you have listed on Artly
            </Card.Description>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-bg-light px-3 py-1 text-xs font-medium text-text-muted sm:flex">
            <Images size={14} className="text-primary" />
            {artistTable?.length ?? 0} total
          </span>
        </Card.Header>

        <Card.Content className="p-0">
          {isTablePending ? (
            <div className="space-y-3 p-6">
              <Skeleton className="h-10 w-full rounded-sm" />
              <Skeleton className="h-10 w-full rounded-sm" />
              <Skeleton className="h-10 w-full rounded-sm" />
            </div>
          ) : artistTable && artistTable.length > 0 ? (
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="My artworks" className="min-w-150">
                  <Table.Header>
                    <Table.Column isRowHeader>ArtWork</Table.Column>
                    <Table.Column>Medium</Table.Column>
                    <Table.Column>Artist Id</Table.Column>
                    <Table.Column>Action</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {artistTable.map((artWork) => (
                      <Table.Row key={artWork._id}>
                        <Table.Cell>
                          <span className="font-medium text-text-dark">
                            {artWork?.title}
                          </span>
                        </Table.Cell>
                        <Table.Cell className="text-text-muted">
                          {artWork?.medium}
                        </Table.Cell>
                        <Table.Cell className="text-text-muted">
                          {artWork?.artist?.artistID}
                        </Table.Cell>
                        <Table.Cell>
                          <Button variant="danger" size="sm" className="gap-1.5">
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          ) : (
            <div className="flex flex-col items-center gap-2 py-14 text-center">
              <ImageOff size={28} className="text-text-muted" />
              <p className="text-sm text-text-muted">
                You haven't listed any artworks yet.
              </p>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ArtistProfile;