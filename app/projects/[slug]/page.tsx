"use client";
import { getProjectBySlug, projectsData } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { Github, PlayCircle, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState, useCallback, useEffect, useRef,use } from 'react';



export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params) as { slug: string };
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);
  const [liveUrlModalOpen, setLiveUrlModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((idx: number) => {
    setSelectedImgIdx(idx);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedImgIdx(null);
  }, []);

  const nextImg = useCallback(() => {
    if (project.galleryImages && selectedImgIdx !== null) {
      setSelectedImgIdx((selectedImgIdx + 1) % project.galleryImages.length);
    }
  }, [project.galleryImages, selectedImgIdx]);

  const prevImg = useCallback(() => {
    if (project.galleryImages && selectedImgIdx !== null) {
      setSelectedImgIdx(
        (selectedImgIdx - 1 + project.galleryImages.length) % project.galleryImages.length
      );
    }
  }, [project.galleryImages, selectedImgIdx]);

  // Trap focus and handle keyboard events when modal is open
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextImg();
      } else if (e.key === 'ArrowLeft') {
        prevImg();
      } else if (e.key === 'Tab' && modalRef.current) {
        // Trap focus inside modal
        const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        } else if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    // Focus the close button on open
    setTimeout(() => {
      if (modalRef.current) {
        const btn = modalRef.current.querySelector('button[aria-label="Close"]') as HTMLElement;
        btn?.focus();
      }
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen, nextImg, prevImg, closeModal]);

  // Helper to normalize liveUrl to array
  const liveUrls = Array.isArray(project.liveUrl)
    ? project.liveUrl
    : (typeof project.liveUrl === 'string' && project.liveUrl !== '#' && project.liveUrl)
      ? [{ title: "Live Site", url: project.liveUrl }]
      : [];

  return (
    <div className="py-16 md:py-24 bg-background">
      <Container>
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 font-headline !text-primary">{project.title}</h1>
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-3xl mx-auto">{project.shortDescription}</p>
        </AnimatedElement>

        {project.videoUrl && (
          <AnimatedElement delay={100} className="mb-12">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl border border-border">
              <iframe
                width="100%"
                height="100%"
                src={project.videoUrl}
                title={`${project.title} Video Showcase`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="bg-muted"
              ></iframe>
            </div>
          </AnimatedElement>
        )}

        {!project.videoUrl && project.imageUrl && (
          <AnimatedElement delay={100} className="mb-12">
            <Image
              src={project.imageUrl}
              alt={project.title}
              data-ai-hint={project.dataAiHint || "project main image"}
              width={1200}
              height={675}
              className="w-full rounded-lg shadow-xl object-cover border border-border"
              priority
            />
          </AnimatedElement>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedElement delay={200}>
              <h2 className="text-2xl md:text-3xl font-semibold font-headline !text-primary mb-4">Project Overview</h2>
              <div
                className="prose prose-lg max-w-none text-foreground/90 
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-primary [&_h1]:mb-4
                  [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-primary [&_h2]:mb-3 [&_h2]:mt-6
                  [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-primary [&_h3]:mb-2 [&_h3]:mt-4
                  [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_ul]:mb-4 [&_ul]:pl-6 [&_li]:mb-2 [&_li]:list-disc
                  [&_ol]:mb-4 [&_ol]:pl-6 [&_ol_li]:list-decimal
                  [&_strong]:font-semibold [&_strong]:text-foreground
                  [&_em]:italic
                  [&_code]:bg-muted [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                  [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-4
                  [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
                  [&_img]:rounded-lg [&_img]:shadow-md [&_img]:mb-4 [&_img]:max-w-full [&_img]:h-auto"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              />
            </AnimatedElement>

            {/* Project Details card for mobile only */}
            <div className="block lg:hidden">
              <AnimatedElement delay={250}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-headline !text-primary">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3 pt-4">
                      {/* --- Live URL Button(s) --- */}
                      {liveUrls.length === 1 && (
                        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          <Link href={liveUrls[0].url} target="_blank" rel="noopener noreferrer">
                            View Live Site <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {liveUrls.length > 1 && (
                        <Button
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={() => setLiveUrlModalOpen(true)}
                        >
                          View Live Access <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      {/* --- End Live URL Modal --- */}
                      {project.githubUrl && (
                        <Button asChild variant="outline" className="w-full text-primary border-primary bg-background hover:bg-primary/10 hover:text-primary hover:border-primary">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            View on GitHub <Github className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>

            {/* Gallery (after overview and details on mobile) */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <AnimatedElement delay={100}>
                <h2 className="text-2xl md:text-3xl font-semibold font-headline !text-primary mt-12 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.galleryImages.map((img, index) => (
                    <AnimatedElement key={index} delay={index * 30} animationConfig={{ initial: 'opacity-0 scale-90', final: 'opacity-100 scale-100' }}>
                      <Image
                        src={img.url}
                        alt={`${project.title} gallery image ${index + 1}`}
                        data-ai-hint={img.dataAiHint || "project screenshot"}
                        width={800}
                        height={600}
                        className="rounded-lg shadow-md object-cover border border-border cursor-pointer"
                        onClick={() => openModal(index)}
                      />
                    </AnimatedElement>
                  ))}
                </div>

              </AnimatedElement>
            )}
          </div>

          {/* Project Details card for desktop only */}
          <aside className="space-y-8 lg:sticky lg:top-24 self-start hidden lg:block">
            <AnimatedElement delay={250}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-headline !text-primary">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3 pt-4">
                    {/* --- Live URL Button(s) --- */}
                    {liveUrls.length === 1 && (
                      <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href={liveUrls[0].url} target="_blank" rel="noopener noreferrer">
                          View Live Site <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {liveUrls.length > 1 && (
                      <Button
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => setLiveUrlModalOpen(true)}
                      >
                        View Live Access <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {/* --- End Live URL Modal --- */}
                    {project.githubUrl && (
                      <Button asChild variant="outline" className="w-full text-primary border-primary bg-background hover:bg-primary/10 hover:text-primary hover:border-primary">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          View on GitHub <Github className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          </aside>

          {/* Modals for images and live URLs */}
          {modalOpen && selectedImgIdx !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-all animate-fade-in"
              onClick={closeModal}
              tabIndex={-1}
              aria-modal="true"
              role="dialog"
            >
              <div
                ref={modalRef}
                className="relative w-screen h-screen max-w-none max-h-none flex flex-col justify-center items-center animate-scale-in"
                onClick={e => e.stopPropagation()}
              >
                {/* Glassmorphism Card */}
                <div className="relative flex flex-col items-center justify-center w-full h-full">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 pointer-events-none z-0" style={{
                    background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(59,130,246,0.15) 100%)'
                  }} />
                  {/* Modal Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    {/* Close Button */}
                    <button
                      className="absolute top-8 right-10 md:top-10 md:right-16 text-2xl md:text-3xl text-white/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/60 rounded-full bg-white/20 backdrop-blur-md shadow-lg transition-colors p-2"
                      onClick={closeModal}
                      aria-label="Close"
                      tabIndex={0}
                      style={{ border: '1.5px solid rgba(255,255,255,0.25)' }}
                    >
                      <svg width="1.5em" height="1.5em" viewBox="0 0 20 20" fill="none">
                        <path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    {/* Navigation & Image */}
                    <div className="flex items-center justify-center w-full h-full px-2 md:px-8">
                      {/* Prev Arrow */}
                      <button
                        className="mr-2 md:mr-6 p-3 md:p-4 rounded-full bg-white/30 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/60 text-2xl text-white shadow-xl backdrop-blur-md border border-white/30 transition-all"
                        onClick={prevImg}
                        aria-label="Previous image"
                        tabIndex={0}
                        style={{ minWidth: 48, minHeight: 48 }}
                      >
                        &#8592;
                      </button>
                      {/* Image Card */}
                      {project.galleryImages && project.galleryImages[selectedImgIdx] && (
                        <div className="flex flex-col items-center w-full max-w-3xl">
                          <div className="relative rounded-2xl border border-white/30 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-lg transition-all"
                            style={{
                              maxHeight: '80vh',
                              maxWidth: '80vw',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Image
                              src={project.galleryImages[selectedImgIdx].url}
                              alt={`${project.title} gallery image ${selectedImgIdx + 1}`}
                              width={1200}
                              height={900}
                              className="object-contain"
                              style={{
                                maxHeight: '80vh',
                                maxWidth: '80vw',
                                width: 'auto',
                                height: 'auto',
                                display: 'block',
                                borderRadius: '1.25rem',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)'
                              }}
                            />

                          </div>
                        </div>
                      )}
                      {/* Next Arrow */}
                      <button
                        className="ml-2 md:ml-6 p-3 md:p-4 rounded-full bg-white/30 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/60 text-2xl text-white shadow-xl backdrop-blur-md border border-white/30 transition-all"
                        onClick={nextImg}
                        aria-label="Next image"
                        tabIndex={0}
                        style={{ minWidth: 48, minHeight: 48 }}
                      >
                        &#8594;
                      </button>
                    </div>
                    {/* Progress Dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                      {project.galleryImages?.map((_, idx) => (
                        <span
                          key={idx}
                          className={`block rounded-full transition-all duration-200 ${idx === selectedImgIdx
                            ? 'bg-primary shadow-lg w-4 h-4'
                            : 'bg-white/40 w-2.5 h-2.5'
                            }`}
                          style={{
                            border: idx === selectedImgIdx ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                            boxShadow: idx === selectedImgIdx ? '0 2px 8px 0 rgba(59,130,246,0.25)' : undefined
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Animations */}
                <style jsx global>{`
                  @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  .animate-fade-in {
                    animation: fade-in 0.25s cubic-bezier(.4,0,.2,1);
                  }
                  @keyframes scale-in {
                    from { transform: scale(0.97); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                  }
                  .animate-scale-in {
                    animation: scale-in 0.22s cubic-bezier(.4,0,.2,1);
                  }
                `}</style>
              </div>
            </div>
          )}
          {liveUrlModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div
                className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-primary"
                  onClick={() => setLiveUrlModalOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold mb-4 text-primary dark:text-black">Choose Live Access</h3>
                <div className="flex flex-col gap-3">
                  {liveUrls.map((item, idx) => (
                    <Button
                      asChild
                      key={idx}
                      className="w-full justify-between"
                      onClick={() => setLiveUrlModalOpen(false)}
                    >
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <span>{item.title}</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <AnimatedElement delay={400} className="mt-16 text-center">
          <Button asChild variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10">
            <Link href="/projects">
              Back to All Projects
            </Link>
          </Button>
        </AnimatedElement>
      </Container>
    </div>
  );
}
