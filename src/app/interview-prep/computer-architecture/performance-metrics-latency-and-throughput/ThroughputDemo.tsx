"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Box, ArrowRight, Gauge, Clock } from 'lucide-react';

const ThroughputDemo = () => {
    const [mode, setMode] = useState<'sequential' | 'pipelined'>('sequential');
    const [isPlaying, setIsPlaying] = useState(false);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Each task is a simple object moving through stages
    // 0: Waiting, 1: Fetch, 2: Decode, 3: Execute, 4: Writeback, 5: Done
    const [tasks, setTasks] = useState<{ id: number, stage: number, progress: number }[]>([]);

    const animationRef = useRef<number>();
    const lastTimeRef = useRef<number>(0);
    const taskIdCounter = useRef(0);

    // Constants
    const STAGE_DURATION = 1000; // ms per stage
    const TOTAL_STAGES = 4;

    const reset = () => {
        setIsPlaying(false);
        setTasksCompleted(0);
        setElapsedTime(0);
        setTasks([]);
        taskIdCounter.current = 0;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

    const togglePlay = () => {
        if (!isPlaying) {
            lastTimeRef.current = performaceNow();
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };

    const performaceNow = () => typeof performance !== 'undefined' ? performance.now() : Date.now();

    useEffect(() => {
        if (!isPlaying) return;

        const loop = (time: number) => {
            const dt = time - lastTimeRef.current;
            lastTimeRef.current = time;

            // Simple simulation logic
            setElapsedTime(prev => prev + dt);

            setTasks(prevTasks => {
                let newTasks = [...prevTasks];

                // 1. Advance existing tasks
                newTasks = newTasks.map(t => {
                    if (t.stage > TOTAL_STAGES) return t; // Already done

                    let newProgress = t.progress + dt;
                    let newStage = t.stage;

                    if (newProgress >= STAGE_DURATION) {
                        newProgress = 0;
                        newStage += 1;
                    }

                    return { ...t, stage: newStage, progress: newProgress };
                });

                // 2. Check for completion
                const newlyCompleted = newTasks.filter(t => t.stage === TOTAL_STAGES + 1 && !prevTasks.find(pt => pt.id === t.id && pt.stage === TOTAL_STAGES + 1));
                if (newlyCompleted.length > 0) {
                    setTasksCompleted(c => c + newlyCompleted.length);
                }

                // Cleanup finished tasks to keep array small
                // But keep them visible for a moment? Let's just filter very old ones.
                newTasks = newTasks.filter(t => t.stage <= TOTAL_STAGES + 1);

                // 3. Spawn new tasks
                // Sequential: Only spawn if NO task is active
                // Pipelined: Spawn if Stage 1 is empty
                const activeTasks = newTasks.filter(t => t.stage <= TOTAL_STAGES);
                const stage1Occupied = activeTasks.some(t => t.stage === 1);

                let shouldSpawn = false;
                if (mode === 'sequential') {
                    shouldSpawn = activeTasks.length === 0;
                } else {
                    shouldSpawn = !stage1Occupied;
                }

                if (shouldSpawn) {
                    newTasks.push({
                        id: taskIdCounter.current++,
                        stage: 1,
                        progress: 0
                    });
                }

                return newTasks;
            });

            animationRef.current = requestAnimationFrame(loop);
        };

        animationRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationRef.current!);
    }, [isPlaying, mode]);

    // Metrics
    const seconds = elapsedTime / 1000;
    const throughput = seconds > 0 ? (tasksCompleted / seconds).toFixed(2) : "0.00";
    // In this simple model, latency is constant per task (4s)
    const latency = "4.00";

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => { reset(); setMode('sequential'); }}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'sequential' ? 'bg-white shadow text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Sequential (Latency Focus)
                    </button>
                    <button
                        onClick={() => { reset(); setMode('pipelined'); }}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'pipelined' ? 'bg-white shadow text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Pipelined (Throughput Focus)
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={togglePlay}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white transition-all ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {isPlaying ? 'Pause' : <><Play className="w-4 h-4" /> Start Simulation</>}
                    </button>
                    <button onClick={reset} className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Simulation Area */}
            <div className="relative h-40 bg-slate-50 border border-slate-200 rounded-xl mb-8 overflow-hidden flex items-center px-4">
                {/* Stages Markers */}
                <div className="absolute inset-x-4 top-2 flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest z-0">
                    <div className="w-1/4 text-center">Fetch</div>
                    <div className="w-1/4 text-center">Decode</div>
                    <div className="w-1/4 text-center">Execute</div>
                    <div className="w-1/4 text-center">Write</div>
                </div>

                {/* Dividers */}
                <div className="absolute left-[25%] top-0 bottom-0 w-px bg-slate-200 border-l border-dashed border-slate-300"></div>
                <div className="absolute left-[50%] top-0 bottom-0 w-px bg-slate-200 border-l border-dashed border-slate-300"></div>
                <div className="absolute left-[75%] top-0 bottom-0 w-px bg-slate-200 border-l border-dashed border-slate-300"></div>

                {/* Tasks */}
                {tasks.map(t => {
                    if (t.stage > 4) return null; // Don't show completed in pipe

                    // Calculate position based on stage + progress
                    // Stage 1 is 0-25%, Stage 2 is 25-50%, etc.
                    const stageBase = (t.stage - 1) * 25;
                    const stageExtra = (t.progress / STAGE_DURATION) * 25;
                    const leftPct = Math.min(stageBase + stageExtra, 100);

                    return (
                        <div
                            key={t.id}
                            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold text-xs"
                            style={{ left: `${leftPct}%`, transition: 'left 0.1s linear' }}
                        >
                            T{t.id}
                        </div>
                    );
                })}
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">
                        <Gauge className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Throughput</div>
                        <div className="text-2xl font-mono font-bold">{throughput} <span className="text-sm text-slate-500">tasks/s</span></div>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">
                        <Clock className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Latency (Per Task)</div>
                        <div className="text-2xl font-mono font-bold">{latency} <span className="text-sm text-slate-500">sec</span></div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500 bg-amber-50 p-3 rounded-lg border border-amber-100">
                {mode === 'sequential'
                    ? "In Sequential mode, the next task waits for the previous one to finish completely."
                    : "In Pipelined mode, a new task enters as soon as the first stage is free."}
            </div>
        </div>
    );
};

export default ThroughputDemo;
