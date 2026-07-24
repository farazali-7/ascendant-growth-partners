import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading, Text } from "@/components/typography";

function CheckGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Heading as="h3" size="h4" tone="muted">
        {title}
      </Heading>
      {children}
    </div>
  );
}

/**
 * Verifies that the installed shadcn/ui components inherit Executive Slate
 * purely through the semantic token bridge, with no component-level changes.
 *
 * If a component here looks off-brand, the fault is in the token mapping in
 * globals.css — that is the point of this block.
 */
export function ComponentCheck() {
  return (
    <div className="flex flex-col gap-12">
      <CheckGroup title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary action</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="lg">
            Large
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </CheckGroup>

      <Separator />

      <CheckGroup title="Card">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Operating partnership</CardTitle>
              <CardDescription>Nine to eighteen months</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" measure="none">
                Embedded alongside the leadership team through a defined period of
                change.
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Board advisory</CardTitle>
              <CardDescription>Ongoing</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" measure="none">
                Counsel to chairs and non-executives on succession, governance and
                capital structure.
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Diagnostic</CardTitle>
              <CardDescription>Six to ten weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" measure="none">
                A structured read of where value is being created, and where it is
                quietly being lost.
              </Text>
            </CardContent>
          </Card>
        </div>
      </CheckGroup>

      <Separator />

      <CheckGroup title="Accordion">
        <div className="max-w-editorial rounded-xl border bg-card px-5">
          <Accordion>
            <AccordionItem value="engagements">
              <AccordionTrigger>How are engagements structured?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Every engagement begins with a diagnostic period. We do not
                  propose a scope until we understand how decisions are actually
                  made inside the organisation.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="clients">
              <AccordionTrigger>How many clients do you take on?</AccordionTrigger>
              <AccordionContent>
                <p>
                  A small number each year. The model depends on partner attention
                  rather than leverage.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CheckGroup>
    </div>
  );
}
