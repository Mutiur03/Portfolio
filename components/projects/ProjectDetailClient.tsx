"use client";
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { Github, ExternalLink, X, ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';

interface Props {
    project: Project;
}

export default function ProjectDetailClient({ project }: Props) {
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
        document.body.style.overflow = 'hidden';

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

    const liveUrls = Array.isArray(project.liveUrl)
        ? project.liveUrl
        : (typeof project.liveUrl === 'string' && project.liveUrl !== '#' && project.liveUrl)
            ? [{ title: 'Live Site', url: project.liveUrl }]
            : [];

    return (
        <div className="py-12 md:py-16 bg-background">
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

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <AnimatedElement delay={200}>
                            <h2 className="text-2xl md:text-3xl font-semibold font-headline !text-primary mb-4">Project Overview</h2>
                            <div
                                className="prose prose-lg max-w-none text-foreground/90"
                                dangerouslySetInnerHTML={{ __html: project.longDescription }}
                            />
                        </AnimatedElement>

                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <AnimatedElement delay={100}>
                                <h2 className="text-2xl md:text-3xl font-semibold font-headline !text-primary mt-12 mb-6">Gallery</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {project.galleryImages.map((img, index) => (
                                        <AnimatedElement key={index} delay={index * 30} animationConfig={{ initial: 'opacity-0 scale-90', final: 'opacity-100 scale-100' }}>
                                            <Image
                                                src={img.url}
                                                alt={`${project.title} gallery image ${index + 1}`}
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

                    {modalOpen && selectedImgIdx !== null && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-all animate-fade-in"
                            onClick={closeModal}
                            tabIndex={-1}
                            aria-modal="true"
                            role="dialog"
                        >
                            <div
                                className="fixed inset-0 pointer-events-none z-0"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(59,130,246,0.15) 100%)'
                                }}
                            />
                            <div
                                ref={modalRef}
                                className="relative w-full h-full max-w-7xl flex flex-col justify-center items-center animate-scale-in overflow-y-auto z-10"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="relative flex flex-col items-center justify-center w-full h-full">
                                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                                        <button
                                            className="absolute top-4 right-4 md:top-8 md:right-10 text-2xl md:text-3xl text-white/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/60 rounded-full bg-white/20 backdrop-blur-md shadow-lg transition-colors p-2"
                                            onClick={closeModal}
                                            aria-label="Close"
                                            tabIndex={0}
                                            style={{ border: '1.5px solid rgba(255,255,255,0.25)' }}
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                        <div className="flex items-center justify-between w-full px-2 md:px-8" style={{ minHeight: '300px' }}>
                                            <button
                                                className="mr-2 md:mr-6 p-3 md:p-4 rounded-full hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/60 text-2xl text-white shadow-xl backdrop-blur-md border border-white/30 transition-all"
                                                onClick={prevImg}
                                                aria-label="Previous image"
                                                tabIndex={0}
                                                style={{ minWidth: 40, minHeight: 40 }}
                                            >
                                                <ChevronLeftIcon className="w-6 h-6" />
                                            </button>
                                            {project.galleryImages && project.galleryImages[selectedImgIdx] && (
                                                <div className="flex flex-col items-center w-full max-w-full sm:max-w-3xl">
                                                    <div className="relative rounded-2xl border border-white/30 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-lg transition-all flex items-center justify-center" style={{ maxHeight: '100vh', maxWidth: '90vw' }}>
                                                        <Image
                                                            src={project.galleryImages[selectedImgIdx].url}
                                                            alt={`${project.title} gallery image ${selectedImgIdx + 1}`}
                                                            width={1200}
                                                            height={900}
                                                            className="rounded-2xl"
                                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover', display: 'block', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <button
                                                className="ml-2 md:ml-6 p-3 md:p-4 rounded-full hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/60 text-2xl text-white shadow-xl backdrop-blur-md border border-white/30 transition-all"
                                                onClick={nextImg}
                                                aria-label="Next image"
                                                tabIndex={0}
                                                style={{ minWidth: 40, minHeight: 40 }}
                                            >
                                                <ChevronLeftIcon className="w-6 h-6 transform rotate-180" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
                                            {project.galleryImages?.map((_, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`block rounded-full transition-all duration-200 ${idx === selectedImgIdx ? 'bg-primary shadow-lg w-4 h-4' : 'bg-white/40 w-2.5 h-2.5'}`}
                                                    style={{ border: idx === selectedImgIdx ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)', boxShadow: idx === selectedImgIdx ? '0 2px 8px 0 rgba(59,130,246,0.25)' : undefined, cursor: 'pointer' }}
                                                    onClick={() => setSelectedImgIdx(idx)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <style jsx global>{`
                  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                  .animate-fade-in { animation: fade-in 0.25s cubic-bezier(.4,0,.2,1); }
                  @keyframes scale-in { from { transform: scale(0.97); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                  .animate-scale-in { animation: scale-in 0.22s cubic-bezier(.4,0,.2,1); }
                `}</style>
                            </div>
                        </div>
                    )}

                    {liveUrlModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full relative" onClick={e => e.stopPropagation()}>
                                <button className="absolute top-3 right-3 text-gray-500 hover:text-primary" onClick={() => setLiveUrlModalOpen(false)} aria-label="Close">
                                    <X className="w-5 h-5" />
                                </button>
                                <h3 className="text-lg font-semibold mb-4 text-primary dark:text-black">Choose Live Access</h3>
                                <div className="flex flex-col gap-3">
                                    {liveUrls.map((item, idx) => (
                                        <Button asChild key={idx} className="w-full justify-between" onClick={() => setLiveUrlModalOpen(false)}>
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

                    <AnimatedElement delay={400} className="mt-16 text-center">
                        <Button asChild variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10">
                            <Link href="/projects">Back to All Projects</Link>
                        </Button>
                    </AnimatedElement>
                </div>
            </Container>
        </div>
    );
}
